const worksheetName = 'SPACES';

export const spacesAboutInfoExcel = async () => {
  console.log(`config: ${worksheetName}`);

};

const main = async () => {
  await spacesAboutInfoExcel();
};

main().catch(error => {
  console.error(error);
});
