import React from 'react';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  isError: boolean;
}

export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.isError) {
      return (
        <section className="section has-text-centered">
          <h1 className="title is-1 has-text-danger my-6">Error Happened</h1>
          <button className="button" onClick={this.handleReload}>
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
