import * as React from 'react';
import PageHeader from './PageHeader';

interface IQuickstartWrapperProps {
  halo: string;
  quickstartContent: React.StatelessComponent;
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

export default function Quickstart(props: IQuickstartWrapperProps) {
  const { halo, quickstartContent } = props;

  return (
    <div role="region" aria-labelledby="api-documentation">
      <PageHeader
        id="api-documentation"
        halo={halo}
        header="Quickstart"
        tabIndex={-1}
        forwardedRef={props.forwardedRef}
      />
      {quickstartContent({})}
    </div>
  );
}
