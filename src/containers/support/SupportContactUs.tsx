import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import PageHeader from '../../components/PageHeader';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import { history } from '../../store';

import SupportContactUsForm from './SupportContactUsForm';

const GitHubSnippet = () => {
  return (
    <div className="vads-u-margin-y--2">
      <h3>Submit an Issue via GitHub</h3>
      <a
        className="usa-button"
        href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose"
      >
        <FontAwesomeIcon icon={faGithub} /> Submit an Issue
      </a>
    </div>
  );
};

interface ISupportContactUsState {
  sent: boolean;
}

export default class SupportContactUs extends React.Component<{}, ISupportContactUsState> {
  public pageHeader: React.RefObject<HTMLDivElement>;
  constructor(props: {}) {
    super(props);
    this.state = {
      sent: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.pageHeader = React.createRef();
  }
  public componentDidMount() {
    this.setPageFocus();
  }
  public componentDidUpdate() {
    this.setPageFocus();
  }

  public render() {
    const headerProps = {
      description:
        'You can submit an issue on GitHub (requires an account) or contact us by using the form below. Please provide as much detail as possible. Your concerns and feedback are important to us, and you can expect a reply within one business day.',
      halo: 'Support',
      header: 'Contact Us',
    };

    if (this.state.sent) {
      return <SupportConfirmation />;
    } else {
      return (
        <section role="region" aria-label="Support Overview">
          <PageHeader forwardedRef={this.pageHeader} {...headerProps} />
          <GitHubSnippet />
          <SupportContactUsForm onSuccess={this.onSuccess} />
        </section>
      );
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

  private onSuccess(): void {
    this.setState({ sent: true });
  }
}
