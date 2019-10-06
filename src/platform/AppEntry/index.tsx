import * as React from 'react';
import { IMenuItem } from '../definitions/general';
import { matchLoadPage } from '../page-loader';
import { IProps, IState } from './types';
// @ts-ignore
import img from './image.jpg';
// @ts-ignore
import './style.scss';

export class AppEntry extends React.Component<IProps, IState> {
  state: IState = {
    Content: () => <h1>Defaults content</h1>,
  };

  matchMountPage = (path: string) => {
    matchLoadPage(path, this.props.pagesMeta)
      .then(Content => this.setState({ Content }));
  }

  renderMenuItem = (menuItem: IMenuItem) => (
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
        <footer className="hello-world">
          <img src={img} alt="" />
          Footer
        </footer>
      </div>
    );
  }
}
