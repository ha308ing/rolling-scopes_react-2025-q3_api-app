import React from 'react';
import type { IRickMortyCharacter } from '../types';
import { Link, useSearchParams } from 'react-router';
import { CharacterInfo } from './character-info';

export interface ICharacterCardProps {
  character: IRickMortyCharacter;
}

export const CharacterCard: React.FC<ICharacterCardProps> = ({ character }) => {
  const [searchParams] = useSearchParams();
  const { name, id } = character;

  return (
    <Link
      to={{
        pathname: `/${id}`,
        search: `?${searchParams.toString()}`,
      }}
    >
      <article className="box cell card-result">
        <header className="is-flex is-justify-content-space-between is-align-items-self-start">
          <h3 className="title">{name}</h3>
          <div>#{id}</div>
        </header>

        <section className="is-flex is-align-items-self-start">
          <CharacterInfo character={character} />
        </section>
      </article>
    </Link>
  );
};
