import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export interface EchoExecutorOptions {
  textToEcho: string;
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing "echo"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.textToEcho}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;

  try {
    var dataFilePath = path.join(__dirname, '..', '..', '..', 'data', 'pokemon.yaml');
    const doc = yaml.load(fs.readFileSync(dataFilePath, 'utf8'));
    var compiledJsonFile = path.join(__dirname, '..', '..', '..', 'apps', 'website', 'src', 'assets', 'file.json');
    fs.writeFileSync(compiledJsonFile, JSON.stringify(doc));
  } catch (e) {
    console.log(e);
  }

  return { success };
}
