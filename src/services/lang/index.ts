import { createProvider } from './createProvider';
import { withTranslation } from './createProvider/consumer';
import { ProviderComponentType, WithTranslationHOCType } from './createProvider/types';
import { createTranslate } from './createTranslate';
import { TranslateComponentType } from './createTranslate/types';
import { createTranslateIds } from './createTranslateIds';

import { IDictionary, ToGetters } from './definitions/lang';

export const createIntl = <TDictionary extends IDictionary>(project: string, lang: string, dictionary: TDictionary): [
  ProviderComponentType,
  TranslateComponentType<TDictionary>,
  ToGetters<TDictionary>,
  WithTranslationHOCType<TDictionary>,
] => {
  return [
    createProvider(project, lang, dictionary),
    createTranslate<TDictionary>(),
    createTranslateIds(dictionary),
    withTranslation,
  ];
};
