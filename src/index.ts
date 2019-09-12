import { createProvider} from './createProvider';
import { ProviderComponentType } from './createProvider/types';
import { createTranslate} from './createTranslate';
import { TranslateComponentType } from './createTranslate/types';
import { createTranslateIds } from './createTranslateIds';

import { IDictionary, ToGetters } from './definitions/lang';

export const createIntl = <TDictionary extends IDictionary>(lang: string, dictionary: TDictionary): [
  ProviderComponentType,
  TranslateComponentType<TDictionary>,
  ToGetters<TDictionary>,
] => {
  return [
    createProvider(lang, dictionary),
    createTranslate<TDictionary>(),
    createTranslateIds(dictionary),
  ];
};
