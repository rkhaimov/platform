import { isString, reduce } from 'lodash';
import { IDictionary } from '../definitions/lang';
import { concatParentWithCurrentKey, isMeta } from '../utils';
import { IDictionarySource, IFlatDictionary } from './types';

export class LangProviderPresenter {
  constructor(private dictionarySource: IDictionarySource) {}

  getDictionary(project: string, lang: string) {
    return this.dictionarySource.getDictionary(project, lang)
      .then(this.flatDictionary);
  }

  flatDictionary = (dictionary: IDictionary, parentDictionaryKey = ''): IFlatDictionary => {
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

      return { ...flat, ...this.flatDictionary(value, path) };
    }, {} as IFlatDictionary);
  }
}
