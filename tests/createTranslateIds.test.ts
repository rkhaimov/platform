import { createTranslateIds } from '../src/createTranslateIds';

describe(`
  createTranslateIds function create object with getters from given dictionary.
  Final object has the same model as dictionary
`, () => {
  it('should transform two level dictionary', () => {
    const result = createTranslateIds({ title: 'title', body: { title: 'title' } });

    expect(result).toEqual({ title: 'title', body: { title: 'body.title' } });
  });

  it('should transform deep dictionary', () => {
    const result = createTranslateIds({
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
      body: {
        title: 'body.title',
        content: {
          center: {
            text: 'body.content.center.text',
          },
        },
      },
    });
  });

  it(`
    should consider keys with meta as single dictionary item
    so the output will be the same as for strings
  `, () => {
    const result = createTranslateIds({
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

    expect(result).toEqual({ title: 'title', body: { title: 'body.title' } });
  });
});
