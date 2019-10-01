import * as React from 'react';
import { IMenuItem, IPageMeta } from '../definitions/general';

export interface IState {
  Content: React.ComponentType<{}>;
}

export interface IProps {
  menuItems: IMenuItem[];
  pagesMeta: IPageMeta[];
}
