export interface IPageMeta {
  id: string;
  mountOn: string;
  actions: string[];
  bundle: {
    entry: string;
    styles?: string;
  };
}

export interface IMenuItem {
  title: string;
  path: string;
}
