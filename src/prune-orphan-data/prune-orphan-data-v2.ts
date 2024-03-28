import { QueryRunner } from 'typeorm';
import { createDeletedEntitiesReport } from './createDeletedEntitiesReport';
import { datasource } from './migration.config';
import { Node, Relation, RelationType } from './node';

type EntityRecord = {
  [key: string]: any;
};
export type DeletedEntityRecord = {
  orphanId: number;
  table: string;
  id: string;
  parentTable?: string;
  parentId?: string;
  authorizationId?: string;
} & {
  [key: string]: any;
};

let totalEntitiesRemoved = 0;
let orphanId = 0;
const entitiesRemovedMap = new Map<string, number>();
const DeletedEntities: DeletedEntityRecord[] = [];

function reportDeletedEntities(
  rows: EntityRecord[],
  orphanId: number,
  table: string,
  parentTable?: string,
  parentId?: string
) {
  const deletedEntities: DeletedEntityRecord[] = rows.map(row => ({
    orphanId,
    table,
    id: row.id,
    parentTable,
    parentId,
    authorizationId: row.authorizationId,
  }));
  DeletedEntities.push(...deletedEntities);
}

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

async function deleteRow(
  queryRunner: QueryRunner,
  table: string,
  row: any,
  orphanId: number
) {
  try {
    await queryRunner.query(`DELETE FROM ${table} WHERE id = ?`, [row.id]);
    reportDeletedEntities([row], orphanId, table);
  } catch (error) {
    console.error(
      `Failed to delete orphaned data with id ${row.id} from table ${table}.`,
      error
    );
  }
}

type DeleteChildRowOptions = {
  queryRunner: QueryRunner;
  table: string;
  refColumnName: string;
  refColumnId: string;
  parentTable: string;
  parentId: string;
  orphanId: number;
};

async function deleteChildRow(options: DeleteChildRowOptions) {
  const {
    queryRunner,
    table,
    refColumnName,
    refColumnId,
    parentTable,
    parentId,
    orphanId,
  } = options;
  try {
    const childRowsBeforeDelete: { id: string }[] = await queryRunner.query(
      `SELECT * FROM ${table} WHERE ${refColumnName} = ?`,
      [refColumnId]
    );

    await queryRunner.query(`DELETE FROM ${table} WHERE ${refColumnName} = ?`, [
      refColumnId,
    ]);

    reportDeletedEntities(
      childRowsBeforeDelete,
      orphanId,
      table,
      parentTable,
      parentId
    );
    totalEntitiesRemoved += childRowsBeforeDelete.length;
    addEntitiesRemoved(table, childRowsBeforeDelete.length);
  } catch (error) {
    console.error(
      `Failed to delete child data from table ${table} where ref column ${refColumnName} is ${parentId}.`,
      error
    );
  }
}

async function pruneChildren(
  nodeMap: Map<string, Node>,
  table: string,
  queryRunner: QueryRunner,
  row: any,
  relationsFilter: RelationType[],
  orphanId: number
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
        await pruneChildren(
          nodeMap,
          rel.node.name,
          queryRunner,
          childOrphan,
          [RelationType.OneToMany],
          orphanId
        );
        await deleteChildRow({
          queryRunner,
          table: rel.node.name,
          refColumnName: rel.refColumnName,
          refColumnId: row[rel.refChildColumnName],
          parentTable: table,
          parentId: row.id,
          orphanId,
        });
        await pruneChildren(
          nodeMap,
          rel.node.name,
          queryRunner,
          childOrphan,
          [RelationType.OneToOne],
          orphanId
        );
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
            [RelationType.OneToMany],
            orphanId
          );
        }
        await deleteChildRow({
          queryRunner,
          table: rel.node.name,
          refColumnName: rel.refColumnName,
          refColumnId: row.id,
          parentTable: table,
          parentId: row.id,
          orphanId,
        });
        for (const childOrphan of childOrphans) {
          await pruneChildren(
            nodeMap,
            rel.node.name,
            queryRunner,
            childOrphan,
            [RelationType.OneToOne],
            orphanId
          );
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

  // const tablesToInclude: string[] = ['callout'];
  // const fitleredTables = tables.filter(table =>
  //   tablesToInclude.includes(table.name)
  // );
  const tablesToSkip: string[] = ['user', 'application_questions', 'document'];
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
      orphanId++;
      await pruneChildren(
        nodeMap,
        table.name,
        queryRunner,
        row,
        [RelationType.OneToMany],
        orphanId
      );
      await deleteRow(queryRunner, table.name, row, orphanId);
      await pruneChildren(
        nodeMap,
        table.name,
        queryRunner,
        row,
        [RelationType.OneToOne],
        orphanId
      );
    }
    totalEntitiesRemoved += orphanedData.length;
    addEntitiesRemoved(table.name, orphanedData.length);
  }

  console.log('\n\n\n');
  console.log(`Total orphaned entities removed: ${totalEntitiesRemoved}`);
  console.log(entitiesRemovedMap);

  createDeletedEntitiesReport(DeletedEntities);
  process.exit(0);
})();
