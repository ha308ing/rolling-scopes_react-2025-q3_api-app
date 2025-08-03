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
}) => {
  const details = [
    { name: 'species', value: species },
    { name: 'origin', value: origin.name },
    { name: 'status', value: status },
    { name: 'gender', value: gender },
    { name: 'type', value: type },
    { name: 'location', value: location.name },
    { name: 'episodes count', value: episode.length },
    { name: 'created', value: new Date(created).toLocaleString() },
  ];

  return (
    <>
      <figure className="image ">
        <img src={image} alt={name} />
      </figure>

      <div className="section">
        {details.map(
          (detail) =>
            detail.value && (
              <CharacterCardDetail key={detail.name} {...detail} />
            )
        )}
      </div>
    </>
  );
};
