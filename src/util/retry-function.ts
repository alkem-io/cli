import { loadAsync } from 'node-yaml-config';
import { sleep } from './sleep';

export async function retryFunction(
  functionToBeRetried: Promise<any>,
  useConfig = false
) {
  let exitLoop = false;
  let retries = 0;
  let maxRetries = 3;
  let retryInterval = 5000;
  if (useConfig) {
    const config = await loadAsync('cli.yml');
    maxRetries = config.retries.retry_count;
    retryInterval = config.retries.interval * 1000;
  }

  do {
    try {
      await functionToBeRetried;
      exitLoop = true;
    } catch (error) {
      console.log(error);
      retries++;
      console.log(
        `Retry ${retries - 1} out of max retries ${maxRetries} executed!`
      );
      await sleep(retryInterval);
      if (retries === maxRetries) exitLoop = true;
    }
  } while (!exitLoop);
}
