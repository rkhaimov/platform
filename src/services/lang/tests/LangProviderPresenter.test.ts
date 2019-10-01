import { LangProviderPresenter } from '../createProvider/presenter';
import { MockDictionaryRepository } from './mocks/MockDictionaryRepository';

describe(`
  LangProviderPresenter is in charge of downloading dictionaries by project name and lang code,
  and normalizing it to standard structure.
  Also it pushes new base dictionaries and flatters given dictionary to one level deep by concatenating all nested keys
`, () => {
  const source = new MockDictionaryRepository();
  const presenter = new LangProviderPresenter(source);

  it('should flat dictionary with two levels deep', () => {
    const result = presenter.flatDictionary({ title: 'title', body: { title: 'title' } });

    expect(result).toEqual({ title: 'title', 'body.title': 'title' });
  });

  it('should flat deep dictionary', () => {
    const result = presenter.flatDictionary({
      title: 'title',
      body: {
        title: 'title',
        content: {
          center: {
            text: 'text',
          },
        },
      },
    });

    expect(result).toEqual({
      title: 'title',
      'body.title': 'title',
      'body.content.center.text': 'text',
    });
  });

  it('should consider meta as simple string value so it will take only text property from this', () => {
    const result = presenter.flatDictionary({
      title: 'title',
      body: {
        title: {
          meta: true,
          text: 'hello {user}',
          parameters: {
            user: 'string',
          },
        },
      },
    });

    expect(result).toEqual({
      title: 'title',
      'body.title': 'hello {user}',
    });
  });
});
