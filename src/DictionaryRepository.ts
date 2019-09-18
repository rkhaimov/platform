import { IDictionarySource } from './createProvider/types';
import { IDictionary } from './definitions/lang';

export class DictionaryRepository implements IDictionarySource {
  getDictionary(project: string, lang: string): Promise<IDictionary> {
    return Promise.resolve({});
  }

  uploadBaseDictionary(project: string, lang: string, dictionary: IDictionary): Promise<void> {
    return Promise.resolve();
  }
}
