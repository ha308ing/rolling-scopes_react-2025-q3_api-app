import React from 'react';
import type { IRickMortyResponse } from '../services/rick-morty';
import { CharacterCardList } from './character-card-list';

export interface IResultsProps {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  data: IRickMortyResponse | string | null;
}

export const Results: React.FC<IResultsProps> = ({
  isLoading,
  isError,
  isSuccess,
  data,
}) => {
  return (
    <div className="block py-6 has-text-centered">
      {isLoading && <h1 className="title">Loading</h1>}

      {isError && (
        <h1 className="title">Failed to get characters: {data as string}</h1>
      )}

      {isSuccess && data && (
        <CharacterCardList results={(data as IRickMortyResponse).results} />
      )}
    </div>
  );
};
