import { QueryRunner } from 'typeorm';
import { datasource } from './migration.config';
import { Node, Relation, RelationType } from './types/node';

let totalEntitiesRemoved = 0;
const entitiesRemovedMap = new Map<string, number>();

function addEntitiesRemoved(table: string, count: number) {
  const currentCount = entitiesRemovedMap.get(table) || 0;
  entitiesRemovedMap.set(table, currentCount + count);
}

const ColumnsWithAllowedNullValues = ['createdBy'];
function createIsNullCheck(str: string): string {
  if (str.endsWith('.id')) {
    return '';
  }
  if (ColumnsWithAllowedNullValues.includes(str)) {
    return '';
  }
  return ` OR ${str} IS NULL`;
}

function createNotInCheck(table: string, fk: Relation): string {
  return `${table}.${fk.refChildColumnName} NOT IN (SELECT ${fk.refColumnName} FROM ${fk.node.name})`;
}

async function deleteRow(queryRunner: QueryRunner, table: string, id: string) {
  try {
    await queryRunner.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  } catch (error) {
    console.error(
      `Failed to delete orphaned data with id ${id} from table ${table}.`,
      error
    );
  }
}

async function deleteChildRow(
  queryRunner: QueryRunner,
  table: string,
  refColumnName: string,
  id: string
) {
  try {
    await queryRunner.query(`DELETE FROM ${table} WHERE ${refColumnName} = ?`, [
      id,
    ]);
  } catch (error) {
    console.error(
      `Failed to delete child data from table ${table} where ref column ${refColumnName} is ${id}.`,
      error
    );
  }
}

async function pruneChildren(
  nodeMap: Map<string, Node>,
  table: string,
  queryRunner: QueryRunner,
  row: any,
  relationsFilter: RelationType[]
) {
  const childRelations = nodeMap.get(table)?.children;
  if (!childRelations) {
    return;
  }

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
          RelationType.OneToMany,
        ]);
        await deleteChildRow(
          queryRunner,
          rel.node.name,
          rel.refColumnName,
          row[rel.refChildColumnName]
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
            [RelationType.OneToMany]
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
  // get only alkemio tables
  const tables = (await queryRunner.getTables()).filter(
    table => table.database === 'alkemio'
  );

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

  // these tables will be covered separately
  const specialTables: string[] = ['user', 'application_questions', 'space'];
  const filteredTables = tables.filter(
    table => !specialTables.includes(table.name)
  );

  totalEntitiesRemoved = 0;

  for (const table of filteredTables) {
    // Generate the SQL query to find orphaned data
    let orphanedDataQuery = `SELECT * FROM ${table.name} WHERE `;
    const parentRelations = nodeMap.get(table.name)?.parents;

    if (!parentRelations || parentRelations.length === 0) {
      continue;
    }

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
    if (orphanedData.length) {
      const [{ count }] = await queryRunner.query(
        `SELECT count(id) as count FROM ${table.name}`
      );
      console.warn(table.name, count, orphanedData.length, orphanedDataQuery);
    } /* else {
      console.log(orphanedData.length, orphanedDataQuery);
    }*/

    // Delete any orphaned data
    for (const row of orphanedData) {
      await pruneChildren(nodeMap, table.name, queryRunner, row, [
        RelationType.OneToMany,
      ]);
      await deleteRow(queryRunner, table.name, row.id);
      await pruneChildren(nodeMap, table.name, queryRunner, row, [
        RelationType.OneToOne,
        RelationType.OneToMany,
      ]);
    }
    totalEntitiesRemoved += orphanedData.length;
    addEntitiesRemoved(table.name, orphanedData.length);
  }

  // todo cover specialTables
  // only root Space is associated with Account
  // await queryRunner.query(`
  //   SELECT * FROM space WHERE level = 0 AND (space.accountId NOT IN (SELECT id FROM account) OR space.accountId IS NULL)
  // `);
  // // only root Space is associated with Account
  // await queryRunner.query(`
  //   SELECT * FROM space WHERE level = 0 AND (space.accountId NOT IN (SELECT id FROM account) OR space.accountId IS NULL)
  // `);
  // // Subspaces must have a parentSpaceId and the Parent must exist
  // await queryRunner.query(`
  //   SELECT * FROM space WHERE level > 0
  //   AND (space.parentSpaceId NOT IN (SELECT id FROM space) OR space.parentSpaceId IS NULL);
  // `);
  // // Subspaces must have a levelZeroSpaceID and the level zero must exist
  // await queryRunner.query(`
  //   SELECT * FROM space WHERE level > 0
  //   AND (space.levelZeroSpaceID NOT IN (SELECT id FROM space WHERE level = 0) OR space.levelZeroSpaceID IS NULL)
  // `);

  console.log('\n\n\n');
  console.log(`Total orphaned entities removed: ${totalEntitiesRemoved}`);
  console.log(entitiesRemovedMap);
})();
