import { IDictionarySource } from '../../createProvider/types';

export class MockDictionaryRepository implements IDictionarySource {
  getDictionary = jest.fn();
  uploadBaseDictionary = jest.fn();
}
