import React from 'react';

interface IErrorButtonState {
  isError: boolean;
}

export class ErrorButton extends React.Component<unknown, IErrorButtonState> {
  state = {
    isError: false,
  };

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('Hello from error button');
    }

    return (
      <button className="button is-danger" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}
