import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { T_PROMISE_STATUS } from '../types';
import {
  getRickMortyCharacterByName,
  type IRickMortyResponse,
} from '../services/rick-morty';
import { PROMISE_STATUS } from '../constants';

export const useRickMorty = () => {
  const [characterName, setCharacterName] = useLocalStorage();
  const [status, setStatus] = useState<T_PROMISE_STATUS | null>(null);
  const [data, setData] = useState<IRickMortyResponse | string | null>(null);
  const previousSearchInput = useRef<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let ac: AbortController | null = null;

    const getData = () => {
      const [requestPromise, abortController] = getRickMortyCharacterByName(
        characterName,
        page
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
    setPage(1);
    setCharacterName(searchQuery);
  };

  const isPaginated =
    typeof data != 'string' && data != null && data.info.pages > 1;

  const pageCount = isPaginated ? data.info.pages : 0;

  return [
    characterName,
    handleSearch,
    status,
    data,
    isPaginated,
    page,
    pageCount,
    setPage,
  ] as const;
};
