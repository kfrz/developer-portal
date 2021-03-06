import classNames from 'classnames';
import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

export interface ICardLinkProps {
  name: string;
  url: string;
  subhead?: JSX.Element;
  className?: string;
  children?: React.ReactNode;
}

/*
 * The CardLink component is a pattern used across the developer portal
 * where links to other parts of the site are made more visually prominent
 * in the form of a card. It can optionally render an arbitrary JSX.Element
 * subhead before its children, which should be a description of the link.
 */
const CardLink = (props: ICardLinkProps): JSX.Element => (
  <NavHashLink
    to={props.url}
    className={classNames(
      'va-api-card',
      'vads-u-border-top--5px',
      'vads-u-margin-y--1p5',
      'vads-u-margin-right--4',
      'vads-u-width--full',
      'vads-u-text-decoration--none',
      'va-api-u-min-height--100',
    )}
  >
    <div
      className={classNames(
        'va-api-name',
        'vads-u-color--gray-dark',
        'vads-u-font-size--lg',
        'vads-u-font-weight--bold',
        'vads-u-line-height--3',
        'vads-u-margin-y--2',
      )}
    >
      {props.name}
    </div>
    {props.subhead}
    <div className={classNames('va-api-description', 'vads-u-color--base')}>{props.children}</div>
  </NavHashLink>
);

export default CardLink;
