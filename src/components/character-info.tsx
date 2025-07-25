import type React from 'react';
import type { IRickMortyCharacter } from '../types';
import { CharacterCardDetail } from './character-card-detail';

interface ICharacterInfoProps {
  character: IRickMortyCharacter;
}

export const CharacterInfo: React.FC<ICharacterInfoProps> = ({
  character: {
    origin,
    type,
    status,
    created,
    gender,
    episode,
    location,
    species,
    image,
    name,
  },
}) => (
  <>
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
  </>
);
