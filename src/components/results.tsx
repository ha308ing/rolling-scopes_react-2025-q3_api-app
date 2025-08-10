import React from 'react';
import { CharacterCardList } from './character-card-list';
import type { IRickMortyResponse } from '../types';
import type { UseQueryResult } from '@tanstack/react-query';

export interface IResultsProps {
  query: UseQueryResult<IRickMortyResponse>;
}

export const Results: React.FC<IResultsProps> = ({
  query: { isLoading, isError, isSuccess, data, error },
}) => {
  return (
    <div className="block py-6 has-text-centered">
      {isLoading && <h1 className="title">Loading</h1>}

      {isError && (
        <h1 className="title">Failed to get characters: {error.message}</h1>
      )}

      {isSuccess && data && <CharacterCardList results={data.results} />}
    </div>
  );
};
