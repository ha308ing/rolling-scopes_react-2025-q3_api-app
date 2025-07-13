import {
  Component,
  type ChangeEventHandler,
  type FormEventHandler,
} from 'react';
import { ErrorButton } from './error-button';

interface ISearchControlsProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
  isLoading?: boolean;
}

export class SearchControls extends Component<ISearchControlsProps> {
  handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    this.props.onSearch();
  };

  render() {
    let inputControlClassName = 'control';
    let buttonClassName = 'button';

    if (this.props.isLoading) {
      const isLoadingClassName = ' is-loading';
      inputControlClassName += isLoadingClassName;
      buttonClassName += isLoadingClassName;
    }

    return (
      <form
        className="field is-grouped is-grouped-centered"
        onSubmit={this.handleSubmit}
      >
        <div className={inputControlClassName}>
          <input
            type="text"
            className="input"
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder="Enter character name"
          />
        </div>
        <div className="control">
          <button type="submit" className={buttonClassName}>
            Search
          </button>
        </div>
        <div className="control">
          <ErrorButton />
        </div>
      </form>
    );
  }
}
