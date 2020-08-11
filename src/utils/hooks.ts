import * as React from 'react';

export function useFocusOnMount() {
  const pageHeader: React.RefObject<HTMLDivElement> = React.useRef(null);
  React.useEffect(() => {
    pageHeader!.current!.focus();
  });

  return pageHeader;
}
