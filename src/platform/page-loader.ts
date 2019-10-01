import * as React from 'react';
import { IPageMeta } from './definitions/general';

export const matchLoadPage = (route: string, pages: IPageMeta[]): Promise<React.ComponentType<{}>> => {
  const pageToLoad = pages.find(page => route.includes(page.mountOn));

  if (pageToLoad === null || pageToLoad === undefined) {
    throw new Error('Page not found');
  }

  return new Promise((resolve) => {
    bindResolveToJsonp(resolve);

    const script = document.createElement('script');

    script.setAttribute('src', pageToLoad.bundle.entry);

    document.body.appendChild(script);

    script.onload = () => {
      document.body.removeChild(script);
    };
  });
};

const bindResolveToJsonp = (resolve: (Component: React.ComponentType<{}>) => void) => {
  window.__jsonpLoader__ = (module) => {
    resolve(module.default.routes);
  };
};
