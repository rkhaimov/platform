import * as fs from 'fs';
import * as ph from 'path';
import { IFileManager } from './types';

export class FSFileManager implements IFileManager {
  joinPaths(...paths: string[]): string {
    return ph.join(...paths);
  }

  readDirectory(path: string): string[] {
    return fs.readdirSync(path);
  }

  readFile(path: string): string {
    return fs.readFileSync(path, 'utf8');
  }

  updateFile(path: string, content: string): void {
    fs.writeFileSync(path, content, 'utf8');
  }
}
