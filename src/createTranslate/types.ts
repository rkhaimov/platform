import * as React from 'react';
import { FlatPickOnlyMetaParameters } from '../definitions/lang';

interface IProps<TDictionary extends {}> {
  id: string;
  values: FlatPickOnlyMetaParameters<TDictionary>;
}

export type TranslateComponentType<TDictionary extends {}> =
  React.ComponentType<IProps<TDictionary>>;
