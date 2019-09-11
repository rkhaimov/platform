import dictionary from './dictionary.json';
import { createIntl } from '../../src';

describe(`
  Mapped types (type aliases in general) infer all nessesary type information from json file
  provided to createIntl factory function
`, () => {
  const [, Translate, translateIds] = createIntl(dictionary);

  it('should collect all parameters from meta information deeply from json', () => {
    Translate.defaultProps = {
      values: { text: 'string' },
    };

    Translate.defaultProps = {
      values: { user: 'string', age: 'string' },
    };

    expect(true).toBeTruthy();
  });

  it(`
    should transform all properties in dictionary to string getters deeply,
    if property contains meta information, then it should be transform in to string
  `, () => {
    acceptIsString(translateIds.site);
    acceptIsString(translateIds.header.title);
    acceptIsString(translateIds.header.right);
    acceptIsString(translateIds.body.center.bottom);

    expect(true).toBeTruthy();
  });
});

function acceptIsString(value: string) {
  return;
}
