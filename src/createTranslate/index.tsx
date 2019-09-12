import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TranslateComponentType } from './types';

export const createTranslate = <TDictionary extends {}>(): TranslateComponentType<TDictionary> => {
  return (props) => <FormattedMessage id={props.id} values={props.values as unknown as Record<string, string>} />;
};
