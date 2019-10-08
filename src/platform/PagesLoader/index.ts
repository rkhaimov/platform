import { IPageMeta } from '../definitions/general';
import { ICurrentPage, IDOMManager } from './types';

export class PagesLoader {
  private current: ICurrentPage | undefined;

  constructor(private dom: IDOMManager, private history: unknown) {}

  findLoadPageByRoute(route: string, pages: IPageMeta[]): Promise<IPageExport> {
    const page = pages.find(({ mountOn }) => route.includes(mountOn))!;

    if (this.isCurrent(page)) {
      return Promise.resolve(this.current!.export); // TODO: violation of null type
    }

    const removeStyle = this.dom.placeStyle(page.manifest['index.css']);

    return this.dom.placeScript(page.manifest['index.js'])
      .then((pageExport) => {
        this.current = { export: pageExport, removeStyle, page };

        return pageExport;
      });
  }

  findExecutePageAction(action: string, payload: unknown, pages: IPageMeta[]): Promise<unknown> {
    const page = pages.find(({ actions }) => actions.includes(action))!;

    if (this.isCurrent(page)) {
      return Promise.resolve(this.current!.export.handleAction(action, payload, this.history));
    }

    return this.dom.placeScript(page.manifest['index.js'])
      .then(pageExport => pageExport.handleAction(action, payload, this.history));
  }

  private isCurrent(page: IPageMeta) {
    return this.current && this.current.page.id === page.id;
  }
}
