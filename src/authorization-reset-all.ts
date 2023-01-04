import { resetAllUsers } from './authorization-reset-all-users';
import { resetAllHubs } from './authorization-reset-all-hubs';
import { resetAllOrganizations } from './authorization-reset-all-organizations';
import { resetPlatform } from './authorization-reset-platform';

const main = async () => {
  await resetAllUsers();
  await resetAllHubs();
  await resetAllOrganizations();
  await resetPlatform();
};

main().catch(error => {
  console.error(error);
});
