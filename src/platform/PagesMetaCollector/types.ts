export interface IFileManager {
  readDirectory(path: string): string[];
  updateFile(path: string, content: string): void;
  readFile(path: string): string;
  joinPaths(...paths: string[]): string;
}
