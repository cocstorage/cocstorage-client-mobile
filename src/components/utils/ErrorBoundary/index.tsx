import { Component, ReactNode } from 'react';

import Error500 from '@pages/500';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <Error500 />;
    }

    return children;
  }
}

export default ErrorBoundary;
