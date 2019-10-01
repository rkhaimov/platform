export interface IPageMeta {
  id: string;
  mountOn: string;
  actions: string[];
  manifest: {
    'index.js': string;
    'index.css': string;
  };
}

export interface IMenuItem {
  title: string;
  path: string;
}
