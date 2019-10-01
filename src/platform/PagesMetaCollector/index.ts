import { IFileManager } from './types';

export class PagesMetaCollector {
  constructor(private fileManager: IFileManager) {}

  collectJoinedPagesMeta(pagesPath: string, metaPath: string) {
    const manifests = this.fileManager.readDirectory(pagesPath)
      .map((page) => {
        const path = this.fileManager.joinPaths(pagesPath, page, 'meta.json');

        return JSON.parse(this.fileManager.readFile(path));
      });

    this.fileManager.updateFile(metaPath, JSON.stringify(manifests));
  }
}
