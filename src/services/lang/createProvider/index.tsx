import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { IDictionary } from '../definitions/lang';
import { DictionaryRepository } from '../DictionaryRepository';
import { LangProviderPresenter } from './presenter';
import { IWithLangProvidedProps, ProviderComponentType } from './types';

export const { Provider, Consumer } = React.createContext<IWithLangProvidedProps>({} as IWithLangProvidedProps);

const presenter = new LangProviderPresenter(new DictionaryRepository());

export const createProvider = (project: string, lang: string, dictionary: IDictionary): ProviderComponentType => {
  class LangProvider extends React.Component<{}, IWithLangProvidedProps> {
    constructor(props: {}) {
      super(props);

      this.state = {
        waiting: false,
        lang,
        dictionary: presenter.flatDictionary(dictionary),
        changeLang: this.changeLangDownloadDictionary,
      };
    }

    changeLangDownloadDictionary = (nextLang: string) => {
      this.setState({ waiting: true });

      presenter.getDictionary(project, nextLang)
        .then(nextDictionary => this.setState({ dictionary: nextDictionary, lang: nextLang }))
        .finally(() => this.setState({ waiting: false }));
    }

    render() {
      return (
        <Provider value={this.state}>
          <IntlProvider locale={this.state.lang} messages={this.state.dictionary}>
            {this.props.children}
          </IntlProvider>
        </Provider>
      );
    }
  }

  return LangProvider;
};
