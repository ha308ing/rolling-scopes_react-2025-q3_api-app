import { Results } from '../components/results';
import { SearchControls } from '../components/search-controls';
import { Pagination } from '../components/pagination';
import { Outlet } from 'react-router';
import { SelectCharactersDrawer } from '../components/select-characters-drawer';
import { useRickMortyName } from '../hooks/use-rick-morty-name';

export const MainPage = () => {
  const {
    query,
    characterName,
    handleSearch,
    page,
    pageCount,
    setPage,
    invalidateQueryCache,
  } = useRickMortyName();

  return (
    <>
      <SearchControls
        onSearch={handleSearch}
        initialValue={characterName}
        isLoading={query.isLoading}
        onInvalidate={invalidateQueryCache}
      />

      <Pagination page={page} pageCount={pageCount} setPage={setPage} />

      <Results query={query} />

      <Outlet />

      <SelectCharactersDrawer />
    </>
  );
};
