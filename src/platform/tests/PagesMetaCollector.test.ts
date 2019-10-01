import { PagesMetaCollector } from '../PagesMetaCollector';
import { MockFileManager } from './mocks/MockFileManager';

describe(`
  PagesManifestCollector is in charge of traversing through each page and reducing
  each manifest into one manifest.json
`, () => {
  const fileManager = new MockFileManager();
  const collector = new PagesMetaCollector(fileManager);

  it(`
    should go through each page and collect information about manifest
    after that it should create a file manifest.json with united information
  `, () => {
    const { pagesPath, joinedMeta, metaPath } = setupMetaJoinTest();

    collector.collectJoinedPagesMeta(pagesPath, metaPath);

    const [path, meta] = fileManager.updateFile.mock.calls[0];

    expect(meta).toEqual(joinedMeta);
    expect(path).toEqual(metaPath);
  });

  function setupMetaJoinTest() {
    const pagesPath = 'dist/pages';
    const metaPath = 'meta.json';
    const page1 = 'page1';
    const page1Meta = { id: 'page1' };
    const page2 = 'page2';
    const page2Meta = { id: 'page2' };
    const joinedMeta = [page1Meta, page2Meta];
    fileManager.readDirectory.mockReturnValueOnce([page1, page2]);
    fileManager.readFile.mockImplementation((page) => {
      if (page === `${pagesPath}/${page1}/meta.json`) {
        return JSON.stringify(page1Meta);
      }

      if (page === `${pagesPath}/${page2}/meta.json`) {
        return JSON.stringify(page2Meta);
      }
    });

    return { pagesPath, joinedMeta: JSON.stringify(joinedMeta), metaPath };
  }
});
