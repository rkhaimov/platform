import * as React from 'react';
import { isNil } from 'lodash';
import { IPageMeta } from './definitions/general';

export const matchLoadPage = (route: string, pages: IPageMeta[]): Promise<React.ComponentType<{}>> => {
  const page = pages.find(element => route.includes(element.mountOn));

  if (page === null || page === undefined) {
    throw new Error('Page not found');
  }

  return Promise.all([loadScript(page), loadStyles(page)])
    .then(([Component]) => Component);
};

const loadScript = (page: IPageMeta) => {
  return new Promise<React.ComponentType<{}>>((resolve) => {
    bindResolveToJsonp(resolve);

    const script = document.createElement('script');

    script.setAttribute('src', page.manifest['index.js']);

    document.body.appendChild(script);

    script.onload = () => {
      document.body.removeChild(script);
    };
  });
};

const loadStyles = (page: IPageMeta) => {
  if (isNil(page.manifest['index.css'])) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = page.manifest['index.css'];

    link.onload = () => resolve();

    document.head.appendChild(link);
  });
};

const bindResolveToJsonp = (resolve: (Component: React.ComponentType<{}>) => void) => {
  window.__jsonpLoader__ = (module) => {
    resolve(module.default.routes);
  };
};
