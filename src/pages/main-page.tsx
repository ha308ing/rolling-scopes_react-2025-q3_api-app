import { Results } from '../components/results';
import { SearchControls } from '../components/search-controls';
import { PROMISE_STATUS } from '../constants';
import { useRickMorty } from '../hooks/use-rick-morty';
import { Pagination } from '../components/pagination';
import { Outlet } from 'react-router';

export const MainPage = () => {
  const [
    data,
    status,
    characterName,
    handleApiSearch,
    page,
    pageCount,
    setPage,
  ] = useRickMorty();

  return (
    <>
      <SearchControls
        onSearch={handleApiSearch}
        initialValue={characterName}
        isLoading={status === PROMISE_STATUS.PENDING}
      />

      <Pagination page={page} pageCount={pageCount} setPage={setPage} />

      <Results status={status} data={data} />

      <Outlet />
    </>
  );
};
