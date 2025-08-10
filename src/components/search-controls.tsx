import React, {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../constants';
import { ThemeChangeButton } from './theme-change-button';

export interface ISearchControlsProps {
  initialValue: string;
  onSearch: (searchInput: string) => void;
  isLoading?: boolean;
  onInvalidate?: () => void;
}

export const SearchControls: React.FC<ISearchControlsProps> = ({
  initialValue,
  isLoading,
  onSearch,
  onInvalidate,
}) => {
  const [searchInput, setSearchInput] = useState(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSearch(searchInput);
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
          value={searchInput}
          onChange={handleChange}
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
        <ThemeChangeButton />
      </div>

      <div className="control">
        <button className="button" onClick={onInvalidate}>
          Invalidate Query Cache
        </button>
      </div>
    </form>
  );
};
