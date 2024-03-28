import { QueryRunner } from 'typeorm';
import {
  DeletedEntityRecord,
  createDeletedEntitiesReport,
} from './createDeletedEntitiesReport';
import { datasource } from './migration.config';
import { Node, RelationType } from './types/node';
import { addParentRelationsChecks } from './utils';
import { getTableRelationsAndUpdateRelationsNodeMap } from './getTableRelationsAndUpdateRelationsNodeMap';

let totalEntitiesRemoved = 0;
let orphanId = 0;
const entitiesRemovedMap = new Map<string, number>();
const DeletedEntities: DeletedEntityRecord[] = [];
let newOrphansPerRun = false;
let scriptRuns = 0;
const maxScriptRuns = 5;

const reportDeletedEntities = (
  rows: any[],
  orphanId: number,
  table: string,
  parentTable?: string,
  parentId?: string
) => {
  const deletedEntities: DeletedEntityRecord[] = rows.map(row => ({
    orphanId,
    table,
    id: row.id,
    parentTable,
    parentId,
    authorizationId: row.authorizationId,
  }));
  DeletedEntities.push(...deletedEntities);
};

const addDeletedEntitiesCount = (table: string, count: number) => {
  const currentCount = entitiesRemovedMap.get(table) || 0;
  entitiesRemovedMap.set(table, currentCount + count);
};

type DeleteRowOptions = {
  queryRunner: QueryRunner;
  table: string;
  row: any;
  orphanId: number;
};

const deleteRow = async (options: DeleteRowOptions) => {
  const { queryRunner, table, row, orphanId } = options;
  try {
    await queryRunner.query(`DELETE FROM ${table} WHERE id = ?`, [row.id]);
    reportDeletedEntities([row], orphanId, table);
  } catch (error) {
    console.error(
      `Failed to delete orphaned data with id ${row.id} from table ${table}.`,
      error
    );
  }
};

type DeleteChildRowOptions = {
  queryRunner: QueryRunner;
  table: string;
  refColumnName: string;
  refColumnId: string;
  parentTable: string;
  parentId: string;
  orphanId: number;
};

const deleteChildRow = async (options: DeleteChildRowOptions) => {
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
    addDeletedEntitiesCount(table, childRowsBeforeDelete.length);
  } catch (error) {
    console.error(
      `Failed to delete child data from table ${table} where ref column ${refColumnName} is ${parentId}.`,
      error
    );
  }
};

const pruneChildren = async (
  nodeMap: Map<string, Node>,
  table: string,
  queryRunner: QueryRunner,
  row: any,
  relationsFilter: RelationType[],
  orphanId: number
) => {
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
};

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

  getTableRelationsAndUpdateRelationsNodeMap(tables, nodeMap);

  // const tablesToInclude: string[] = ['callout'];
  // const fitleredTables = tables.filter(table =>
  //   tablesToInclude.includes(table.name)
  // );
  const tablesToSkip: string[] = ['user', 'application_questions', 'document'];
  const fitleredTables = tables.filter(
    table => !tablesToSkip.includes(table.name)
  );

  totalEntitiesRemoved = 0;

  do {
    newOrphansPerRun = false;
    scriptRuns++;
    console.log(
      `Script run: ${scriptRuns}`,
      `Current total entities removed: ${totalEntitiesRemoved}`
    );
    for (const table of fitleredTables) {
      // Generate the SQL query to find orphaned data
      let orphanedDataQuery = `SELECT * FROM ${table.name} WHERE `;
      const parentRelations = nodeMap.get(table.name)?.parents;

      if (!parentRelations || parentRelations.length === 0) continue;

      const parentRelationsChecks: string[] = [];
      addParentRelationsChecks(parentRelations, parentRelationsChecks, table);

      if (parentRelationsChecks.length === 0) {
        continue;
      }

      orphanedDataQuery = orphanedDataQuery.concat(
        parentRelationsChecks.join(' AND ')
      );

      // Find any orphaned data
      const orphanedData: any[] = await queryRunner.query(orphanedDataQuery);

      if (orphanedData.length) newOrphansPerRun = true;

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
        await deleteRow({ queryRunner, table: table.name, row, orphanId });
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
      addDeletedEntitiesCount(table.name, orphanedData.length);
    }
    if (!newOrphansPerRun) {
      console.log('No new orphans found.');
    }
    if (scriptRuns >= maxScriptRuns) {
      console.log('Max script runs reached. Exiting...');
    }
  } while (newOrphansPerRun);

  console.log(`Total orphaned entities removed: ${totalEntitiesRemoved}`);
  console.log(entitiesRemovedMap);

  createDeletedEntitiesReport(DeletedEntities);
  process.exit(0);
})();
