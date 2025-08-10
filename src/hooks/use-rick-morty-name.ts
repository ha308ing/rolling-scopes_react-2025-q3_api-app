import { useCallback, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { API_FIRST_PAGE, API_SEARCH_PARAM_PAGE } from '../constants';
import { useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { IRickMortyResponse } from '../types';
import { fetchRickMorty } from '../utils/fetch-rick-morty';

export const useRickMortyName = () => {
  const [characterName, setCharacterName] = useLocalStorage();
  const previousSearchInput = useRef('');
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

  const query = useQuery<IRickMortyResponse>({
    queryKey: ['characters', characterName, page],
    queryFn: async () => {
      const queryString = `/?name=${characterName}&page=${page}`;

      return await fetchRickMorty(queryString);
    },
    retry: 2,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const invalidateQueryCache = () =>
    queryClient.invalidateQueries({
      queryKey: ['characters'],
    });

  const handleSearch = (searchInput: string) => {
    const searchQuery = searchInput.trim();

    if (searchQuery === previousSearchInput.current) {
      return;
    }

    previousSearchInput.current = searchQuery;
    setPage(API_FIRST_PAGE);
    setCharacterName(searchQuery);
  };

  const pageCount = query.isSuccess ? query.data?.info.pages : 0;

  return {
    query,
    characterName,
    handleSearch,
    page: +page,
    pageCount,
    setPage,
    invalidateQueryCache,
  };
};
