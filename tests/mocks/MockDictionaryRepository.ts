import { IDictionarySource } from '../../src/createProvider/types';

export class MockDictionaryRepository implements IDictionarySource {
  getDictionary = jest.fn();
  uploadBaseDictionary = jest.fn();
}
