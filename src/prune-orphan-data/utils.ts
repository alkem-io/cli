import { Table } from 'typeorm';
import { Relation } from './types/node';

const ColumnsWithAllowedNullValues = ['createdBy'];
export const createIsNullCheck = (str: string): string => {
  if (str.endsWith('.id')) return '';
  if (ColumnsWithAllowedNullValues.includes(str)) return '';
  return ` OR ${str} IS NULL`;
};

export const createNotInCheck = (table: string, fk: Relation): string => {
  return `${table}.${fk.refChildColumnName} NOT IN (SELECT ${fk.refColumnName} FROM ${fk.node.name})`;
};

export const addParentRelationsChecks = (
  parentRelations: Relation[],
  parentRelationsChecks: string[],
  table: Table
) => {
  for (const fk of parentRelations) {
    parentRelationsChecks.push(
      `(${createNotInCheck(table.name, fk)} ${createIsNullCheck(
        `${table.name}.${fk.refChildColumnName}`
      )})`
    );
  }
};
