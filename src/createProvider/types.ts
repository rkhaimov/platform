import * as React from 'react';
import { FlatPickOnlyMetaParameters } from '../definitions/lang';
import { IntlShape } from 'react-intl';

export type ProviderComponentType = React.ComponentType<{}>;

export interface IWithLangProvidedProps {
  lang: string;
  changeLang(lang: string): void;
}

export interface IIntlInjectProvidedProps<TDictionary> {
  intl: IntlShape;
  translate(id: string, values?: FlatPickOnlyMetaParameters<TDictionary>): string;
}

export type CreateWithTranslationProvidedProps<TDictionary> = IWithLangProvidedProps & IIntlInjectProvidedProps<TDictionary>;

export type WithTranslationHOCType<TDictionary> =
    <TProps, TOwnProps = Omit<TProps, keyof CreateWithTranslationProvidedProps<unknown>>>(
      WrappedComponent: React.ComponentType<TProps>,
    ) => React.ComponentType<TOwnProps>;
