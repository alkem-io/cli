import { Table } from 'typeorm';
import { Node, Relation, RelationType } from './types/node';

export const getTableRelationsAndUpdateRelationsNodeMap = (
  tables: Table[],
  nodeMap: Map<string, Node>
) => {
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
};
