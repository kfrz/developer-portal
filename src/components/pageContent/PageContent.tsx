import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SiteRoutes } from '../../Routes';

const focusAndScroll = (elementToFocus: HTMLElement | null) => {
  if (elementToFocus) {
    elementToFocus.focus();
  }

  window.scrollTo(0, 0);
};

const PageContent = (props: RouteComponentProps): JSX.Element => {
  const mainRef = React.useRef<HTMLElement>(null);
  const prevPathRef = React.useRef<string | null>(null);

  const { location } = props;

  React.useEffect(() => {
    const prevPath: string | null = prevPathRef.current;
    
    if (prevPath !== location.pathname || location.hash) {
      // Only focus and scroll if it's not an initial page load
      if (prevPath) {
        focusAndScroll(mainRef.current);
      }
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <SiteRoutes />
    </main>
  );
};

PageContent.propTypes = {};

export { PageContent };
