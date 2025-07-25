import React from 'react';
import { CharacterCardDetail } from './character-card-detail';
import type { IRickMortyCharacter } from '../types';
import { Link, useSearchParams } from 'react-router';

export interface ICharacterCardProps {
  character: IRickMortyCharacter;
}

export const CharacterCard: React.FC<ICharacterCardProps> = ({
  character: {
    name,
    image,
    origin,
    type,
    id,
    status,
    created,
    gender,
    episode,
    location,
    species,
  },
}) => {
  const [searchParams] = useSearchParams();

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
          <figure className="image ">
            <img src={image} alt={name} />
          </figure>

          <div className="section">
            <CharacterCardDetail name="Species" value={species} />
            <CharacterCardDetail name="Origin" value={origin.name} />
            <CharacterCardDetail name="Status" value={status} />
            <CharacterCardDetail name="Gender" value={gender} />
            {type && <CharacterCardDetail name="Type" value={type} />}
            <CharacterCardDetail name="Location" value={location.name} />
            <CharacterCardDetail name="Episodes count" value={episode.length} />
            <CharacterCardDetail
              name="Created"
              value={new Date(created).toLocaleString()}
            />
          </div>
        </section>
      </article>
    </Link>
  );
};
