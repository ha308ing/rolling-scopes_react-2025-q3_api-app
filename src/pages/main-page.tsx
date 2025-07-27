import { Results } from '../components/results';
import { SearchControls } from '../components/search-controls';
import { useRickMorty } from '../hooks/use-rick-morty';
import { Pagination } from '../components/pagination';
import { Outlet } from 'react-router';

export const MainPage = () => {
  const {
    data,
    characterName,
    handleSearch,
    page,
    pageCount,
    setPage,
    isLoading,
    isError,
    isSuccess,
  } = useRickMorty();

  return (
    <>
      <SearchControls
        onSearch={handleSearch}
        initialValue={characterName}
        isLoading={isLoading}
      />

      <Pagination page={page} pageCount={pageCount} setPage={setPage} />

      <Results
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={data}
      />

      <Outlet />
    </>
  );
};
