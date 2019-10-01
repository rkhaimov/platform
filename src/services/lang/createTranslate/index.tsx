import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TranslateComponentType } from './types';

export const createTranslate = <TDictionary extends {}>(): TranslateComponentType<TDictionary> => {
  return ({ id, values, ...rest }) => (
    <FormattedMessage id={id} values={values as unknown as Record<string, string>} {...rest} />
  );
};
