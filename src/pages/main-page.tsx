import { useState, type ChangeEventHandler } from 'react';
import { Results } from '../components/results';
import { SearchControls } from '../components/search-controls';
import { PROMISE_STATUS } from '../constants';
import { useRickMorty } from '../hooks/use-rick-morty';

export const MainPage = () => {
  const [characterName, handleApiSearch, status, data] = useRickMorty();
  const [searchInput, setSearchInput] = useState(characterName);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    handleApiSearch(searchInput);
  };

  return (
    <main className="container section">
      <SearchControls
        onChange={handleChange}
        onSearch={handleSearch}
        value={searchInput}
        isLoading={status === PROMISE_STATUS.PENDING}
      />

      <Results status={status} data={data} />
    </main>
  );
};
