import React from 'react';
import type { IRickMortyCharacter } from '../types';
import { Link, useSearchParams } from 'react-router';
import { CharacterInfo } from './character-info';
import { useSelectCharacter } from '../hooks/use-select-character';

export interface ICharacterCardProps {
  character: IRickMortyCharacter;
}

export const CharacterCard: React.FC<ICharacterCardProps> = ({ character }) => {
  const [searchParams] = useSearchParams();
  const { name, id } = character;

  const { handleSelect, isSelected } = useSelectCharacter(character);

  return (
    <article className="box cell card-result">
      <header className="is-flex is-justify-content-space-between is-align-items-self-start mb-4">
        <div className="control">
          <input type="checkbox" checked={isSelected} onChange={handleSelect} />
        </div>
        <Link
          to={{
            pathname: `/${id}`,
            search: `?${searchParams.toString()}`,
          }}
        >
          <h3 className="title">{name}</h3>
        </Link>
        <div>#{id}</div>
      </header>

      <section className="is-flex is-align-items-self-start">
        <CharacterInfo character={character} />
      </section>
    </article>
  );
};
