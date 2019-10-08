import { IPageMeta } from '../definitions/general';
import { PagesLoader } from '../PagesLoader';

describe('PagesLoader is in charge of loading pages and managing them, in general', () => {
  const { HISTORY, ACTION_PAYLOAD, DOMManager, PAGE_EXPORT } = setup();

  describe('Loader load pages and executes actions', () => {
    const loader = new PagesLoader(DOMManager, HISTORY);

    it('should load page if it matches giving route', async () => {
      const [page, meta] = await loadPage(loader);

      expect(DOMManager.placeScript).toHaveBeenCalledWith(meta.manifest['index.js']);
      expect(DOMManager.placeStyle).toHaveBeenCalledWith(meta.manifest['index.css']);
      expect(page).toEqual(PAGE_EXPORT);
    });

    it('should load and execute matched script action without loading it`s style', async () => {
      PAGE_EXPORT.handleAction.mockClear();
      const expectedPage = PAGES[1];
      const action = expectedPage.actions[0];
      DOMManager.placeScript.mockResolvedValue(PAGE_EXPORT);

      await loader.findExecutePageAction(action, ACTION_PAYLOAD, PAGES);

      expect(DOMManager.placeScript).toHaveBeenCalledWith(expectedPage.manifest['index.js']);
      expect(PAGE_EXPORT.handleAction).toHaveBeenCalledWith(action, ACTION_PAYLOAD, HISTORY);
    });
  });

  describe('Loader caches current page to minimize final work', () => {
    it('should not load page but return it`s export if it was already loaded before', async () => {
      const loader = new PagesLoader(DOMManager, HISTORY);

      await loadPage(loader);

      DOMManager.placeScript.mockClear();
      DOMManager.placeStyle.mockClear();

      const [page] = await loadPage(loader);

      expect(page).toEqual(PAGE_EXPORT);
      expect(DOMManager.placeScript).not.toHaveBeenCalled();
      expect(DOMManager.placeStyle).not.toHaveBeenCalled();
    });

    it('should not load page but execute action of last memoized page script', async () => {
      PAGE_EXPORT.handleAction.mockClear();
      const loader = new PagesLoader(DOMManager, HISTORY);

      const [, meta] = await loadPage(loader);
      await loader.findExecutePageAction(meta.actions[0], ACTION_PAYLOAD, PAGES);

      DOMManager.placeScript.mockClear();

      expect(DOMManager.placeScript).not.toHaveBeenCalled();
      expect(PAGE_EXPORT.handleAction).toHaveBeenCalled();
    });
  });

  function loadPage(loader: PagesLoader) {
    const route = '/about/company';
    DOMManager.placeScript.mockResolvedValue(PAGE_EXPORT);

    return loader.findLoadPageByRoute(route, PAGES)
      .then<[IPageExport, IPageMeta]>(response => [response, PAGES[0]]);
  }
});

const PAGES: IPageMeta[] = [
  {
    id: 'about-page',
    mountOn: '/about',
    actions: ['about-page/goToDefinitions'],
    manifest: {
      'index.css': 'about-page/index.css',
      'index.js': 'about-page/index.js',
    },
  },
  {
    id: 'contacts-page',
    mountOn: '/contacts',
    actions: ['contacts-page/goToCompanyAbout'],
    manifest: {
      'index.css': 'contacts/index.css',
      'index.js': 'contacts/index.js',
    },
  },
];

function setup() {
  const DOMManager = { placeScript: jest.fn(), placeStyle: jest.fn() };

  const PAGE_EXPORT = {
    routes: jest.fn(),
    handleAction: jest.fn(),
  };

  const ACTION_PAYLOAD = { payload: 'payload' };
  const HISTORY = { history: 'history' };

  return {
    DOMManager,
    PAGE_EXPORT,
    ACTION_PAYLOAD,
    HISTORY,
  };
}

