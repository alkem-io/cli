import { resetAllUsers } from './authorization-reset-all-users';
import { resetAllHubs } from './authorization-reset-all-hubs';
import { resetAllOrganizations } from './authorization-reset-all-organizations';

const main = async () => {
  await resetAllUsers();
  await resetAllHubs();
  await resetAllOrganizations();
};

main().catch(error => {
  console.error(error);
});
