import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { IDictionary } from '../definitions/lang';
import { flatDictionary } from './flatDictionary';
import { IWithLangProvidedProps, ProviderComponentType } from './types';

const { Provider } = React.createContext<IWithLangProvidedProps>({} as IWithLangProvidedProps);

export const createProvider = (lang: string, dictionary: IDictionary): ProviderComponentType => {
  const flatteredDictionary = flatDictionary(dictionary);

  class LangProvider extends React.Component<{}, IWithLangProvidedProps> {
    constructor(props: {}) {
      super(props);

      this.state = {
        lang,
        changeLang: (nextLang: string) => this.setState({ lang: nextLang }),
      };
    }

    render() {
      return (
        <Provider value={this.state}>
          <IntlProvider locale={this.state.lang} messages={flatteredDictionary} />
        </Provider>
      );
    }
  }

  return LangProvider;
};
