import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { T_PROMISE_STATUS } from '../types';
import {
  getRickMortyCharacterByName,
  type IRickMortyResponse,
} from '../services/rick-morty';
import {
  API_FIRST_PAGE,
  API_SEARCH_PARAM_PAGE,
  PROMISE_STATUS,
} from '../constants';
import { useSearchParams } from 'react-router';

export const useRickMorty = () => {
  const [characterName, setCharacterName] = useLocalStorage();
  const [status, setStatus] = useState<T_PROMISE_STATUS | null>(null);
  const [data, setData] = useState<IRickMortyResponse | string | null>(null);
  const previousSearchInput = useRef<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(API_SEARCH_PARAM_PAGE) ?? API_FIRST_PAGE;

  const setPage = (page: number) => {
    setSearchParams((currentUrlSearchParams) => {
      currentUrlSearchParams.set(API_SEARCH_PARAM_PAGE, page + '');
      return currentUrlSearchParams;
    });
  };

  useEffect(() => {
    let ac: AbortController | null = null;

    const getData = () => {
      const [requestPromise, abortController] = getRickMortyCharacterByName(
        characterName,
        +page
      );

      ac = abortController;

      setStatus(PROMISE_STATUS.PENDING);

      requestPromise.then((response) => {
        if (response.success) {
          setStatus(PROMISE_STATUS.FULFILLED);
          setData(response.data);
        } else {
          setStatus(PROMISE_STATUS.REJECTED);
          setData(response.data);
        }
      });
    };

    getData();

    return () => {
      ac?.abort();
    };
  }, [characterName, page]);

  const handleSearch = (searchInput: string) => {
    const searchQuery = searchInput.trim();

    if (searchQuery === previousSearchInput.current) {
      return;
    }

    previousSearchInput.current = searchQuery;
    setPage(API_FIRST_PAGE);
    setCharacterName(searchQuery);
  };

  const isPaginated =
    typeof data != 'string' && data != null && data.info.pages > API_FIRST_PAGE;

  const pageCount = isPaginated ? data.info.pages : 0;

  return [
    characterName,
    handleSearch,
    status,
    data,
    isPaginated,
    +page,
    pageCount,
    setPage,
  ] as const;
};
