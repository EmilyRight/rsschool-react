import React from 'react';

type TErrorBoundaryState = {
  hasError: boolean;
};

type TErrorBoundaryProps = {
  fallback: string;
  children: React.ReactNode | React.ReactNode[];
};

class ErrorBoundary extends React.Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Ошибка поймана в Error Boundary:', error);
    console.error('Информация об ошибке:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
