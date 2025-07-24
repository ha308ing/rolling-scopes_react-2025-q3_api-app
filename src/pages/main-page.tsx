import { useState, type ChangeEventHandler } from 'react';
import { Results } from '../components/results';
import { SearchControls } from '../components/search-controls';
import { PROMISE_STATUS } from '../constants';
import { useRickMorty } from '../hooks/use-rick-morty';
import { Pagination } from '../components/pagination';

export const MainPage = () => {
  const [
    characterName,
    handleApiSearch,
    status,
    data,
    isPaginated,
    page,
    pageCount,
    setPage,
  ] = useRickMorty();
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

      {isPaginated && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}

      <Results status={status} data={data} />
    </main>
  );
};
