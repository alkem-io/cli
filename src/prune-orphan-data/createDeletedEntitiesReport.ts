import XLSX from 'xlsx';

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

export const createDeletedEntitiesReport = (
  deletedEntities: DeletedEntityRecord[]
) => {
  const timestamp = new Date().getTime();
  const worksheetName = 'orphans';
  const workbookName = `./${timestamp}-deleted-orphans.xlsx`;

  const workbook = XLSX.utils.book_new();
  const orphansSheet = XLSX.utils.json_to_sheet(deletedEntities);
  XLSX.utils.book_append_sheet(workbook, orphansSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};
