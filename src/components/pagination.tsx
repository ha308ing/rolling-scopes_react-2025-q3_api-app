import type React from 'react';
import { API_FIRST_PAGE } from '../constants';

interface IPaginationProps {
  page: number;
  pageCount: number;
  setPage: (newPage: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  page,
  pageCount,
  setPage,
}) => {
  const isFirstPage = page === API_FIRST_PAGE;

  const isLastPage = page === pageCount;

  const handleNextPage = () => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      setPage(page - 1);
    }
  };

  const handleGoFirstPage = () => {
    setPage(1);
  };

  const handleGoLastPage = () => {
    setPage(pageCount);
  };

  return (
    <nav
      className="pagination is-centered pt-6"
      role="navigation"
      aria-label="pagination"
    >
      {!isFirstPage && (
        <button onClick={handlePreviousPage} className="pagination-previous">
          Previous
        </button>
      )}
      {!isLastPage && (
        <button onClick={handleNextPage} className="pagination-next">
          Next page
        </button>
      )}
      <ul className="pagination-list">
        {!isFirstPage && (
          <li>
            <button
              onClick={handleGoFirstPage}
              className="pagination-link"
              aria-label="Goto page 1"
            >
              1
            </button>
          </li>
        )}

        {page > 2 && (
          <>
            {page > 3 && (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            )}
            <li>
              <button
                onClick={handlePreviousPage}
                className="pagination-link"
                aria-label={`Goto page ${page - 1}`}
              >
                {page - 1}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            className="pagination-link is-current"
            aria-label={`Page ${page}`}
            aria-current="page"
          >
            {page}
          </button>
        </li>
        {page + 1 < pageCount && (
          <>
            <li>
              <button
                onClick={handleNextPage}
                className="pagination-link"
                aria-label={`Goto page ${page + 1}`}
              >
                {page + 1}
              </button>
            </li>

            {page + 2 < pageCount && (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            )}
          </>
        )}
        {!isLastPage && (
          <li>
            <button
              onClick={handleGoLastPage}
              className="pagination-link"
              aria-label={`Goto page ${pageCount}`}
            >
              {pageCount}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
