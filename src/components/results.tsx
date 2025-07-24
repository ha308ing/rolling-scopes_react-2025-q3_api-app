import React from 'react';
import type { IRickMortyResponse } from '../services/rick-morty';
import { CharacterCardList } from './character-card-list';
import type { T_PROMISE_STATUS } from '../types';
import { PROMISE_STATUS } from '../constants';

interface IResultsProps {
  status: T_PROMISE_STATUS | null;
  data: IRickMortyResponse | string | null;
}

export const Results: React.FC<IResultsProps> = ({ status, data }) => (
  <div className="block py-6 has-text-centered">
    {status === PROMISE_STATUS.PENDING && <h1 className="title">Loading</h1>}

    {status === PROMISE_STATUS.REJECTED && (
      <h1 className="title">Failed to get characters: {data as string}</h1>
    )}

    {status === PROMISE_STATUS.FULFILLED && data && (
      <CharacterCardList results={(data as IRickMortyResponse).results} />
    )}
  </div>
);
