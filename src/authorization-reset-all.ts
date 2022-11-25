import { resetAllUsers } from './authorization-reset-all-users';
import { resetAllHubs } from './authorization-reset-all-hubs';
import { resetAllOrganizations } from './authorization-reset-all-organizations';
import { resetLibrary } from './authorization-reset-library';

const main = async () => {
  await resetAllUsers();
  await resetAllHubs();
  await resetAllOrganizations();
  await resetLibrary();
};

main().catch(error => {
  console.error(error);
});
