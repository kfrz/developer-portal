import classNames from 'classnames';
import * as React from 'react';
import { match as Match } from 'react-router';
import { NavLink } from 'react-router-dom';
import { desktopOnly, mobileOnly } from '../styles/vadsUtils';

export interface ILargeScreenNavItemProps {
  isActive: (match: Match | null) => boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface IMainNavItemProps {
  children: React.ReactChild | React.ReactChildren;
  activeClassName?: string;
  className?: string;
  excludeLargeScreen: boolean;
  excludeSmallScreen: boolean;
  targetUrl: string;
  largeScreenProps: ILargeScreenNavItemProps;
  onClick: () => void;
}

export default class MainNavItem extends React.PureComponent<IMainNavItemProps> {
  public static defaultProps = {
    excludeLargeScreen: false,
    excludeSmallScreen: false,
    onClick: null,
  };

  public render() {
    const sharedProps = {
      activeClassName: classNames('va-api-active-nav', this.props.activeClassName),
      className: classNames('va-api-nav-link', this.props.className),
      to: this.props.targetUrl,
    };

    return (
      <React.Fragment>
        {!this.props.excludeLargeScreen && (
          <div className={desktopOnly()}>
            <NavLink {...sharedProps} {...this.props.largeScreenProps}>
              {this.props.children}
            </NavLink>
          </div>
        )}
        {!this.props.excludeSmallScreen && (
          <div className={mobileOnly()}>
            <NavLink onClick={this.props.onClick} {...sharedProps}>
              {this.props.children}
            </NavLink>
          </div>
        )}
      </React.Fragment>
    );
  }
}
