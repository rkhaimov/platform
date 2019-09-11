import * as React from 'react';
import { FlatPickOnlyMetaParameters } from './types';

export type TranslateComponentType<TDictionary extends {}> =
  React.ComponentType<{ id: string; values: FlatPickOnlyMetaParameters<TDictionary> }>;

export const createTranslate = <TDictionary extends {}>(): TranslateComponentType<TDictionary> => {
  return () => <React.Fragment />;
};
