import { reduce, isString, set, isBoolean } from 'lodash';
import { IMeta, ToGetters } from './types';

export const createTranslateIds = <TDictionary extends {}>(dictionary: TDictionary, parentDictionaryKey = ''): ToGetters<TDictionary> => {
  return reduce(dictionary, (getters, dictionaryStringOrObject, dictionaryKey) => {
    const fullPath = concatParentWithCurrentKey(dictionaryKey, parentDictionaryKey);

    if (isStringOrMeta(dictionaryStringOrObject)) {
      set(getters, dictionaryKey, fullPath);

      return getters;
    }

    set(getters, dictionaryKey, createTranslateIds(dictionaryStringOrObject, fullPath));

    return getters;
  }, {} as ToGetters<TDictionary>);
};

const concatParentWithCurrentKey = (key: string, parentKey: string) => {
  if (!parentKey) {
    return key;
  }

  return `${parentKey}.${key}`;
};

const isStringOrMeta = (value: string | IMeta | unknown): value is string | IMeta => {
  if (isString(value)) {
    return true;
  }

  return isBoolean((value as IMeta).meta);
};
