import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';
import ExplorePage from '../../content/explorePage.mdx';
import { history } from '../../store';
import { IApiNameParam } from '../../types';
import ApiDocumentation from './ApiDocumentation';

const DeactivationMessage = ({ api }: { api: IApiDescription }) => {
  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  const content = isDeactivated
    ? api.deactivationInfo!.deactivationContent
    : api.deactivationInfo!.deprecationContent;
  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-deprecation-alert')}>
      <div className={classNames('usa-alert-body')}>{content({})}</div>
    </div>
  );
};

export default class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>> {
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
    const { params } = this.props.match;
    const api = this.getApi();
    if (api === null) {
      return <ExplorePage />;
    }

    const category = lookupApiCategory(params.apiCategoryKey)!;
    return (
      <Flag name={`enabled.${api.urlFragment}`} fallbackComponent={ExplorePage}>
        <div role="region" aria-labelledby="api-documentation">
          <PageHeader
            id="api-documentation"
            halo={category.name}
            header={api.name}
            forwardedRef={this.pageHeader}
          />
          <DeactivationMessage api={api} />
          {!isApiDeactivated(api) && (
            <ApiDocumentation
              apiDefinition={api}
              categoryKey={params.apiCategoryKey}
              location={this.props.location}
            />
          )}
        </div>
      </Flag>
    );
  }
  protected setPageFocus() {
    if (!history.location.hash) {
      const element = this.pageHeader!.current;
      setTimeout(() => {
        element!.focus();
      }, 0);
    }
  }
  private getApi(): IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }
}
