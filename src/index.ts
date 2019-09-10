import { createProvider, ProviderComponentType } from './createProvider';
import { createTranslate, TranslateComponentType } from './createTranslate';
import { createTranslateIds } from './createTranslateIds';

import { IDictionary, ToGetters } from './types';

export const createIntl = <TDictionary extends IDictionary>(dictionary: TDictionary): [
  ProviderComponentType,
  TranslateComponentType<TDictionary>,
  ToGetters<TDictionary>,
] => {
  return [
    createProvider(dictionary),
    createTranslate<TDictionary>(),
    createTranslateIds(dictionary),
  ];
};
