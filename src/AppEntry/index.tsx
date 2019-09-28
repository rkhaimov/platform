import * as React from 'react';
import { matchLoadPage } from '../page-loader';
import { IProps, IState } from './types';

export class AppEntry extends React.Component<IProps, IState> {
  state: IState = {
    Content: () => <h1>Default content</h1>,
  };

  matchMountPage = (path: string) => {
    matchLoadPage(path, this.props.pagesMeta)
      .then(Content => this.setState({ Content }));
  }

  renderMenuItem = menuItem => (
    <div onClick={() => this.matchMountPage(menuItem.path)}>{menuItem.title}</div>
  )

  render() {
    const { Content } = this.state;

    return (
      <div>
        <header>
          {this.props.menuItems.map(this.renderMenuItem)}
        </header>
        <div>
          <Content />
        </div>
        <footer>
          Footer
        </footer>
      </div>
    );
  }
}
