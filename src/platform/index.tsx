import * as React from 'react';
import { render } from 'react-dom';

import { AppEntry } from './AppEntry';
import { IMenuItem, IPageMeta } from './definitions/general';

const MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Main',
    path: '/main',
  },
  {
    title: 'About',
    path: '/about',
  },
];

class MetaLoader extends React.Component<{}, { loading: boolean; meta: IPageMeta[] }> {
  state = {
    loading: true,
    meta: [],
  };

  componentDidMount(): void {
    fetch('meta.json')
      .then(response => response.json())
      .then(meta => this.setState({ meta: [].concat(meta) }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    return <AppEntry menuItems={MENU_ITEMS} pagesMeta={this.state.meta} />;
  }
}

render(<MetaLoader />, document.body);
