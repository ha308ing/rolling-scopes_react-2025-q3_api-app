import React, { type ChangeEventHandler, type FormEventHandler } from 'react';
import { ErrorButton } from './error-button';
import { Link } from 'react-router';
import { ROUTES } from '../constants';

export interface ISearchControlsProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
  isLoading?: boolean;
}

export const SearchControls: React.FC<ISearchControlsProps> = ({
  value,
  onChange,
  onSearch,
  isLoading,
}) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSearch();
  };

  const inputControlClassName = isLoading ? 'control is-loading' : 'control';
  const buttonClassName = isLoading ? 'button is-loading' : 'button';

  return (
    <form
      className="field is-grouped is-grouped-centered"
      onSubmit={handleSubmit}
    >
      <div className={inputControlClassName}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={onChange}
          placeholder="Enter character name"
        />
      </div>
      <div className="control">
        <button type="submit" className={buttonClassName}>
          Search
        </button>
      </div>

      <Link to={ROUTES.ABOUT}>
        <button className="button">About</button>
      </Link>

      <div className="control">
        <ErrorButton />
      </div>
    </form>
  );
};
