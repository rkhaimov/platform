import { IFileManager } from '../../PagesMetaCollector/types';

export class MockFileManager implements IFileManager {
  readDirectory = jest.fn();
  readFile = jest.fn();
  updateFile = jest.fn();

  joinPaths = (...paths: string[]) => paths.join('/');

  clearAllMocks = () => {
    this.readDirectory.mockClear();
    this.readFile.mockClear();
    this.updateFile.mockClear();
  }
}
