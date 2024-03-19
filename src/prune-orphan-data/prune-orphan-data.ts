import { datasource } from './migration.config';
import { Node, Relation, RelationType } from './node';

let totalEntitiesRemoved = 0;
const entitiesRemovedMap = new Map<string, number>();

function addEntitiesRemoved(table: string, count: number) {
  const currentCount = entitiesRemovedMap.get(table) || 0;
  entitiesRemovedMap.set(table, currentCount + count);
}

const ColumnsWithAllowedNullValues = ['createdBy'];
function createIsNullCheck(str: string): string {
  if (str.endsWith('.id')) return '';
  if (ColumnsWithAllowedNullValues.includes(str)) return '';
  return ` OR ${str} IS NULL`;
}

function createNotInCheck(table: string, fk: Relation): string {
  return `${table}.${fk.refChildColumnName} NOT IN (SELECT ${fk.refColumnName} FROM ${fk.node.name})`;
}

async function deleteRow(queryRunner: any, table: string, id: string) {
  return queryRunner.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

async function deleteChildRow(
  queryRunner: any,
  table: string,
  refColumnName: string,
  id: string
) {
  return queryRunner.query(`DELETE FROM ${table} WHERE ${refColumnName} = ?`, [
    id,
  ]);
}

async function pruneChildren(
  nodeMap: Map<string, Node>,
  table: string,
  queryRunner: any,
  row: any,
  relationsFilter: RelationType[]
) {
  const childRelations = nodeMap.get(table)?.children;
  if (!childRelations) return;

  for (const rel of childRelations) {
    if (
      rel.type === RelationType.OneToOne &&
      relationsFilter.includes(rel.type)
    ) {
      const [childOrphan] = await queryRunner.query(
        `SELECT * FROM ${rel.node.name} WHERE ${rel.refColumnName} = ?`,
        [row[rel.refChildColumnName]]
      );

      if (childOrphan) {
        await pruneChildren(nodeMap, rel.node.name, queryRunner, childOrphan, [
          RelationType.ManyToOne,
        ]);
        await deleteChildRow(
          queryRunner,
          rel.node.name,
          rel.refColumnName,
          row.id
        );
        await pruneChildren(nodeMap, rel.node.name, queryRunner, childOrphan, [
          RelationType.OneToOne,
          RelationType.OneToMany,
        ]);

        totalEntitiesRemoved++;
        addEntitiesRemoved(rel.node.name, 1);
      }
    }

    if (
      rel.type === RelationType.OneToMany &&
      relationsFilter.includes(rel.type)
    ) {
      const childOrphans = await queryRunner.query(
        `SELECT * FROM ${rel.node.name} WHERE ${rel.refColumnName} = ?`,
        [row[rel.refChildColumnName]]
      );

      if (childOrphans) {
        for (const childOrphan of childOrphans) {
          await pruneChildren(
            nodeMap,
            rel.node.name,
            queryRunner,
            childOrphan,
            [RelationType.ManyToOne]
          );
          await deleteChildRow(
            queryRunner,
            rel.node.name,
            rel.refColumnName,
            row.id
          );
          await pruneChildren(
            nodeMap,
            rel.node.name,
            queryRunner,
            childOrphan,
            [RelationType.OneToOne, RelationType.OneToMany]
          );

          totalEntitiesRemoved++;
          addEntitiesRemoved(rel.node.name, 1);
        }
      }
    }

    if (
      rel.type === RelationType.ManyToOne &&
      relationsFilter.includes(rel.type)
    ) {
      const childOrphans = await queryRunner.query(
        `SELECT * FROM ${rel.node.name} WHERE ${rel.refColumnName} = ?`,
        [row[rel.refChildColumnName]]
      );

      if (childOrphans) {
        for (const childOrphan of childOrphans) {
          await pruneChildren(
            nodeMap,
            rel.node.name,
            queryRunner,
            childOrphan,
            [RelationType.ManyToOne]
          );
          await deleteChildRow(
            queryRunner,
            rel.node.name,
            rel.refColumnName,
            row.id
          );
          await pruneChildren(
            nodeMap,
            rel.node.name,
            queryRunner,
            childOrphan,
            [RelationType.OneToOne, RelationType.OneToMany]
          );

          totalEntitiesRemoved++;
          addEntitiesRemoved(rel.node.name, 1);
        }
      }
    }
  }
}

(async () => {
  await datasource.initialize();
  const queryRunner = datasource.createQueryRunner();
  await queryRunner.connect();

  const tables = (await queryRunner.getTables()).filter(
    table => table.database === 'alkemio'
  );

  const nodesWithManyToOneRelations = new Map<string, Node>();
  const tablesWithManyToOneRelations = new Set<string>();

  const nodeMap: Map<string, Node> = new Map(
    tables.map(table => [table.name, new Node(table.name)])
  );

  for (const table of tables) {
    for (const foreignKey of table.foreignKeys) {
      const parent = nodeMap.get(table.name);

      if (!parent) {
        throw new Error(`Node '${table.name}' not found`);
      }

      const child = nodeMap.get(foreignKey.referencedTableName);

      if (!child) {
        throw new Error(`Node '${foreignKey.referencedTableName}' not found`);
      }

      const index = table.indices.find(index =>
        index.columnNames.includes(foreignKey.columnNames[0])
      );
      if (index?.isUnique) {
        child.parents.push(
          new Relation(
            parent,
            foreignKey.columnNames[0],
            foreignKey.referencedColumnNames[0],
            foreignKey?.name,
            RelationType.OneToOne
          )
        );
        parent.children.push(
          new Relation(
            child,
            foreignKey.referencedColumnNames[0],
            foreignKey.columnNames[0],
            foreignKey?.name,
            RelationType.OneToOne
          )
        );
      } else {
        parent.parents.push(
          new Relation(
            child,
            foreignKey.referencedColumnNames[0],
            foreignKey.columnNames[0],
            foreignKey?.name,
            RelationType.ManyToOne
          )
        );
        tablesWithManyToOneRelations.add(table.name);

        child.children.push(
          new Relation(
            parent,
            foreignKey.columnNames[0],
            foreignKey.referencedColumnNames[0],
            foreignKey?.name,
            RelationType.OneToMany
          )
        );
      }
    }
  }

  tablesWithManyToOneRelations.forEach(tableName => {
    nodesWithManyToOneRelations.set(tableName, nodeMap.get(tableName) as Node);
  });
  //   console.log('\n\n-------------lifecycle parents-----------');
  //   nodeMap.get('lifecycle')?.parents.forEach((parent) => {
  //     console.log('node nama :', parent.node.name);
  //     console.log('refColumnName :', parent.refColumnName);
  //     console.log('refChildColumnName :', parent.refChildColumnName);
  //     console.log('fkName :', parent.fkName);
  //     console.log('=====================');
  //   });
  //   console.log('\n\n-------------lifecycle children-----------');
  //   nodeMap.get('lifecycle')?.children.forEach((child) => {
  //     console.log('node nama :', child.node.name);
  //     console.log('refColumnName :', child.refColumnName);
  //     console.log('refChildColumnName :', child.refChildColumnName);
  //     console.log('fkName :', child.fkName);
  //     console.log('=====================');
  //   });

  //   const tablesToInclude: string[] = ['callout_framing'];
  //   const fitleredTables = tables.filter((table) =>
  //     tablesToInclude.includes(table.name)
  //   );
  const tablesToSkip: string[] = ['user', 'application_questions'];
  const fitleredTables = tables.filter(
    table => !tablesToSkip.includes(table.name)
  );

  totalEntitiesRemoved = 0;

  for (const table of fitleredTables) {
    // Generate the SQL query to find orphaned data
    let orphanedDataQuery = `SELECT * FROM ${table.name} WHERE `;
    const parentRelations = nodeMap.get(table.name)?.parents;

    if (!parentRelations || parentRelations.length === 0) continue;

    const parentRelationsChecks = [];

    for (const fk of parentRelations) {
      parentRelationsChecks.push(
        `(${createNotInCheck(table.name, fk)} ${createIsNullCheck(
          `${table.name}.${fk.refChildColumnName}`
        )})`
      );
    }

    if (parentRelationsChecks.length === 0) {
      continue;
    }

    orphanedDataQuery = orphanedDataQuery.concat(
      parentRelationsChecks.join(' AND ')
    );

    // Find any orphaned data
    const orphanedData: any[] = await queryRunner.query(orphanedDataQuery);

    // Delete any orphaned data
    for (const row of orphanedData) {
      try {
        await pruneChildren(nodeMap, table.name, queryRunner, row, [
          RelationType.ManyToOne,
          RelationType.OneToMany,
        ]);
        await deleteRow(queryRunner, table.name, row.id);
        await pruneChildren(nodeMap, table.name, queryRunner, row, [
          RelationType.OneToOne,
          RelationType.OneToMany,
        ]);
      } catch (error) {
        console.error(
          `Failed to delete orphaned data with id ${row.id} from table ${table.name}.`,
          error
        );
      }
    }
    totalEntitiesRemoved += orphanedData.length;
    addEntitiesRemoved(table.name, orphanedData.length);
  }

  console.log('\n\n\n');
  console.log(`Total orphaned entities removed: ${totalEntitiesRemoved}`);
  console.log(entitiesRemovedMap);
})();
