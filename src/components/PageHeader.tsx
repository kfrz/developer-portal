import classNames from 'classnames';
import * as React from 'react';

import './PageHeader.scss';

interface IPageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
  id?: string;
  tabIndex?: number;
  forwardedRef?: any;
}

export default class PageHeader extends React.Component<IPageHeaderProps, {}> {
  // public headerRef: any;
  // constructor(props: IPageHeaderProps) {
  //   super(props);
  //   this.headerRef = React.createRef();
  // }
  public render() {
    const { forwardedRef } = this.props;
    return (
      <div className={this.props.className} tabIndex={this.props.tabIndex} ref={forwardedRef}>
        {this.props.halo && (
          <div className={classNames('header-halo', 'vads-u-color--gray')}>{this.props.halo}</div>
        )}
        <h1
          id={this.props.id}
          className={classNames('vads-u-margin-top--0', 'vads-u-margin-bottom--2')}
        >
          {this.props.header}
        </h1>
        {this.props.description && (
          <h2 className={classNames('vads-u-font-size--lg')}>{this.props.description}</h2>
        )}
      </div>
    );
  }
}
