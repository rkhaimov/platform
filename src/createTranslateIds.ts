import { reduce, set, isString } from 'lodash';
import { ToGetters } from './definitions/lang';
import { concatParentWithCurrentKey, isMeta } from './utils';

export const createTranslateIds = <TDictionary extends {}>(dictionary: TDictionary, parentDictionaryKey = ''): ToGetters<TDictionary> => {
  return reduce(dictionary, (getters, dictionaryStringOrObject, dictionaryKey) => {
    const fullPath = concatParentWithCurrentKey(dictionaryKey, parentDictionaryKey);

    if (isString(dictionaryStringOrObject) || isMeta(dictionaryStringOrObject)) {
      set(getters, dictionaryKey, fullPath);

      return getters;
    }

    set(getters, dictionaryKey, createTranslateIds(dictionaryStringOrObject, fullPath));

    return getters;
  }, {} as ToGetters<TDictionary>);
};
