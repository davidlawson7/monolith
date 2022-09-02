import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export default async function echoExecutor(
  options: any,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Packaging up for lambda deployment...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `cd ./dist/apps/uploader-service && npm install`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;

  return { success };
}
