import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';
import { history } from '../../store';
import { IApiNameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';

import './AuthorizationDocs.scss';

export class AuthorizationDocs extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public pageHeader: React.RefObject<HTMLDivElement>;

  constructor(props: RouteComponentProps<IApiNameParam>) {
    super(props);
    this.pageHeader = React.createRef();
  }
  public componentDidMount() {
    this.setPageFocus();
  }
  public componentDidUpdate() {
    this.setPageFocus();
  }
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const category = lookupApiCategory(apiCategoryKey);
    if (category != null) {
      if (category.apis.some(api => !!api.oAuth) && apiCategoryKey !== 'benefits') {
        return (
          <div className="va-api-authorization-docs">
            <PageHeader
              halo={category.name}
              header="Authorization"
              forwardedRef={this.pageHeader}
            />
            <OAuth />
          </div>
        );
      } else {
        return <ApiKeyAuth apiCategoryKey={apiCategoryKey} />;
      }
    } else {
      return <Redirect to="/explore/bogus" />;
    }
  }
  protected setPageFocus() {
    if (!history.location.hash) {
      const element = this.pageHeader!.current;
      setTimeout(() => {
        element!.focus();
      }, 0);
    } else {
      const element = document.getElementById(history.location.hash.replace('#', ''));
      setTimeout(() => {
        element!.focus();
      }, 0);
    }
  }
}
