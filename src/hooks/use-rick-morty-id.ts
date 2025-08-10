import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { IRickMortyCharacter } from '../types';
import { fetchRickMorty } from '../utils/fetch-rick-morty';

const queryKey = 'character';

export const useRickMortyId = (characterId: string) => {
  const query = useQuery<IRickMortyCharacter>({
    queryKey: [queryKey, characterId],
    queryFn: async () => {
      const queryString = `/${characterId}`;

      return await fetchRickMorty(queryString);
    },
    retry: 2,
  });

  const queryClient = useQueryClient();

  const invalidateQueryCache = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });

  return {
    query,
    invalidateQueryCache,
  };
};
