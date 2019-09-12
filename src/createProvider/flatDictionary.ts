import { reduce, isString } from 'lodash';
import { IDictionary } from '../definitions/lang';
import { concatParentWithCurrentKey, isMeta } from '../utils';

interface IFlatDictionary { [key: string]: string; }

export const flatDictionary = (dictionary: IDictionary, parentDictionaryKey = ''): IFlatDictionary => {
  return reduce(dictionary, (flat, value, key) => {
    const path = concatParentWithCurrentKey(key, parentDictionaryKey);

    if (isString(value)) {
      flat[path] = value;

      return flat;
    }

    if (isMeta(value)) {
      flat[path] = value.text;

      return flat;
    }

    return { ...flat, ...flatDictionary(value, path) };
  }, {} as IFlatDictionary);
};
