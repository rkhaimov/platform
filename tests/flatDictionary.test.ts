import { flatDictionary } from '../src/createProvider/flatDictionary';

describe('flatDictionary flatters given dictionary to one level deep by concatenating all nested keys', () => {
  it('should flat dictionary with two levels deep', () => {
    const result = flatDictionary({ title: 'title', body: { title: 'title' } });

    expect(result).toEqual({ 'title': 'title', 'body.title': 'title' });
  });

  it('should flat deep dictionary', () => {
    const result = flatDictionary({
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
      'title': 'title',
      'body.title': 'title',
      'body.content.center.text': 'text',
    });
  });

  it('should consider meta as simple string value so it will take only text property from this', () => {
    const result = flatDictionary({
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
      'title': 'title',
      'body.title': 'hello {user}',
    });
  });
});
