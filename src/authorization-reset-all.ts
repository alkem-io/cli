import { resetAllUsers } from './authorization-reset-all-users';
import { resetAllEcoverses } from './authorization-reset-all-ecoverses';
import { resetAllOrganizations } from './authorization-reset-all-organizations';

const main = async () => {
  await resetAllUsers();
  await resetAllEcoverses();
  await resetAllOrganizations();
};

main().catch(error => {
  console.error(error);
});
