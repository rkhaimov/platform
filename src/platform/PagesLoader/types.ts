import { IPageMeta } from '../definitions/general';

export interface IDOMManager {
  placeScript(path: string): Promise<IPageExport>;
  placeStyle(path: string): RemoveStyleFunction;
}

type RemoveStyleFunction = () => void;

export interface ICurrentPage {
  removeStyle: RemoveStyleFunction;
  export: IPageExport;
  page: IPageMeta;
}
