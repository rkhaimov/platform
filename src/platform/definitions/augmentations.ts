interface IPageExport {
  routes: React.ComponentType<{}>;
  handleAction(action: string, payload: unknown, history: unknown): unknown;
}

// tslint:disable-next-line:interface-name
interface Window {
  __PAGES_META__: Array<import('./general').IPageMeta>;
  __jsonpLoader__(module: { default: IPageExport }): unknown;
}
