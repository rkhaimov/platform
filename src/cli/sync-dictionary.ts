#!/usr/bin/env node
/* tslint:disable:no-var-requires */
import * as yargs from 'yargs';
import * as path from 'path';

const argv = yargs
  .usage('Usage: $0 --config [path]')
  .example('$0 --config ./lang.config.json', 'updates lang config of current project')
  .alias('c', 'config')
  .describe('c', 'contains relative path to lang config json file')
  .demandOption(['c'])
  .argv;

const config: ISyncDictionaryConfig = require(path.resolve(argv.config as string));
const dictionary = require(path.resolve(config.dictionary));

Promise.resolve()
  .then(() => {
    // tslint:disable-next-line:no-console
    console.log('Updated dictionary successfully', dictionary);
  });

interface ISyncDictionaryConfig {
  project: string;
  lang: string;
  dictionary: string;
}
