import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import QuickstartWrapper from '../../components/QuickstartWrapper';
import { history } from '../../store';
import { IApiNameParam } from '../../types';

export default class QuickstartPage extends React.Component<
  RouteComponentProps<IApiNameParam>,
  {}
> {
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
    const {
      content: { quickstart: quickstartContent },
      name,
    } = getApiDefinitions()[apiCategoryKey];

    if (quickstartContent) {
      return (
        <QuickstartWrapper
          halo={name}
          quickstartContent={quickstartContent}
          forwardedRef={this.pageHeader}
        />
      );
    } else {
      return <Redirect to={`/explore/${apiCategoryKey}`} />;
    }
  }
  protected setPageFocus() {
    if (!history.location.hash) {
      const element = this.pageHeader!.current;
      setTimeout(() => {
        element!.focus();
      }, 0);
    }
  }
}
