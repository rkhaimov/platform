import * as React from 'react';

export type ProviderComponentType = React.ComponentType<{}>;

export interface IWithLangProvidedProps {
  lang: string;
  changeLang(lang: string): void;
}
