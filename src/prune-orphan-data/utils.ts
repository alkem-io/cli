import { Table } from 'typeorm';
import { Relation } from './types/node';

const ColumnsWithAllowedNullValues = ['createdBy'];
export const createIsNullCheck = (str: string): string => {
  if (str.endsWith('.id')) {
    return '';
  }
  if (ColumnsWithAllowedNullValues.includes(str)) {
    return '';
  }
  return ` OR ${str} IS NULL`;
};

export const createNotExistsCheck = (table: string, fk: Relation): string => {
  return `NOT EXISTS (SELECT 1 FROM ${fk.node.name} WHERE ${fk.node.name}.${fk.refColumnName} = ${table}.${fk.refChildColumnName})`;
};
// does not take into account NULLS in the parent
// NOT IN returns 0 records when compared against an unknown value (null)
//  3 <> 1 and 3 <> 2 and 3 <> null
// which evaluates to: TRUE and TRUE and UNKNOWN, which evaluates to: UNKNOWN
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
      `(${createNotExistsCheck(table.name, fk)}${createIsNullCheck(
        `${table.name}.${fk.refChildColumnName}`
      )})`
    );
  }
};
