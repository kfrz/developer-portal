import { Flag } from 'flag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';
import { history } from '../../store';
import { defaultFlexContainer } from '../../styles/vadsUtils';

export default class DocumentationOverview extends React.Component<RouteComponentProps, {}> {
  public pageHeader: React.RefObject<HTMLDivElement>;

  constructor(props: RouteComponentProps) {
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
    const apiDefinitions = getApiDefinitions();
    const apiCategoryOrder = getApiCategoryOrder();

    return (
      <div>
        <PageHeader
          header="Documentation"
          description="Explore usage policies and technical details about VA's API offerings."
          forwardedRef={this.pageHeader}
        />
        <div className={defaultFlexContainer()}>
          {apiCategoryOrder.map((apiCategoryKey: string) => {
            const { name, content } = apiDefinitions[apiCategoryKey];
            return (
              <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
                <CardLink name={name} url={`/explore/${apiCategoryKey}`}>
                  {content.shortDescription}
                </CardLink>
              </Flag>
            );
          })}
        </div>
      </div>
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
}
