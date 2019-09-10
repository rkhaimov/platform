import * as React from 'react';
import { FlatPickOnlyMetaParameters } from './types';

export type TranslateComponentType<TDictionary extends unknown> =
  React.ComponentType<{ id: string; values: FlatPickOnlyMetaParameters<TDictionary> }>;

export const createTranslate = <TDictionary extends unknown>(): TranslateComponentType<TDictionary> => {
  return () => <React.Fragment />;
};
