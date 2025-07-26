import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { IRickMortyCharacter, T_PROMISE_STATUS } from '../types';
import {
  getRickMortyCharacterById,
  getRickMortyCharacterByName,
  type IRickMortyResponse,
} from '../services/rick-morty';
import {
  API_FIRST_PAGE,
  API_SEARCH_PARAM_PAGE,
  PROMISE_STATUS,
} from '../constants';
import { useSearchParams } from 'react-router';

export const useRickMorty = <
  R extends IRickMortyCharacter | IRickMortyResponse = IRickMortyResponse,
>(
  characterId?: string
) => {
  const [characterName, setCharacterName] = useLocalStorage();
  const [status, setStatus] = useState<T_PROMISE_STATUS | null>(null);
  const [data, setData] = useState<R | string | null>(null);
  const previousSearchInput = useRef<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(API_SEARCH_PARAM_PAGE) ?? API_FIRST_PAGE;

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((currentUrlSearchParams) => {
        currentUrlSearchParams.set(API_SEARCH_PARAM_PAGE, page + '');
        return currentUrlSearchParams;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    let ac: AbortController | null = null;

    const getData = () => {
      setStatus(PROMISE_STATUS.PENDING);

      if (characterId && Number.isNaN(parseInt(characterId))) {
        setStatus(PROMISE_STATUS.REJECTED);
        setData(`Character id must be a number`);
        return;
      }

      const [requestPromise, abortController] = characterId
        ? getRickMortyCharacterById(+characterId)
        : getRickMortyCharacterByName(characterName, +page);

      ac = abortController;

      requestPromise.then((response) => {
        if (response.success) {
          setStatus(PROMISE_STATUS.FULFILLED);
          setData(response.data as R);
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
  }, [characterId, characterName, page]);

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
    typeof data != 'string' &&
    data != null &&
    (data as IRickMortyResponse).info?.pages > API_FIRST_PAGE;

  const pageCount = isPaginated ? (data as IRickMortyResponse)?.info.pages : 0;

  return [
    data,
    status,
    characterName,
    handleSearch,
    +page,
    pageCount,
    setPage,
  ] as const;
};
