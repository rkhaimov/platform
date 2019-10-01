interface IPageExport {
  routes: React.ComponentType<{}>;
}

// tslint:disable-next-line:interface-name
interface Window {
  __jsonpLoader__(module: { default: IPageExport }): unknown;
}
