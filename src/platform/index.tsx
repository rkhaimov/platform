import * as React from 'react';
import { render } from 'react-dom';

import { AppEntry } from './AppEntry';
import { IMenuItem, IPageMeta } from './definitions/general';

const MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Main',
    path: '/main',
  },
  {
    title: 'About',
    path: '/about',
  },
];

const PAGES_META: IPageMeta[] = [
  {
    id: 'about',
    mountOn: '/about',
    actions: [],
    bundle: {
      entry: './pages/${route}/index.js',
    },
  },
];

render(<AppEntry menuItems={MENU_ITEMS} pagesMeta={PAGES_META} />, document.body);
