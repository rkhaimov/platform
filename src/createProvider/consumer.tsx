import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';

import { Consumer } from './index';
import { IWithLangProvidedProps, WithTranslationHOCType } from './types';

export const withTranslation: WithTranslationHOCType<unknown> = (WrappedComponent) => {
  class WithTranslation extends React.PureComponent<Record<'intl', IntlShape>> {
    static displayName = `withTranslation(${WrappedComponent.name})`;

    translate = (id: string, values?: Record<string, string>) => {
      return this.props.intl.formatMessage({ id }, values);
    }

    renderPassConsumedProps = (consumedProps: IWithLangProvidedProps) => {
      return (
        <WrappedComponent
          translate={this.translate}
          {...consumedProps}
          {...this.props as any}
        />
      );
    }

    render() {
      return (
        <Consumer>
          {this.renderPassConsumedProps}
        </Consumer>
      );
    }
  }

  return injectIntl(WithTranslation) as React.ComponentType<any>;
};
