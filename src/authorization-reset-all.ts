import { resetAllUsers } from './authorization-reset-all-users';
import { resetAllAccounts } from './authorization-reset-all-accounts';
import { resetAllOrganizations } from './authorization-reset-all-organizations';
import { resetPlatform } from './authorization-reset-platform';

const main = async (useConfig = false) => {
  if (process.argv[2]) useConfig = process.argv[2] === 'true';
  await resetAllUsers(useConfig);
  await resetAllAccounts(useConfig);
  await resetAllOrganizations(useConfig);
  await resetPlatform();
};

main().catch(error => {
  console.error(error);
});
