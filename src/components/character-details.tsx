import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useRickMorty } from '../hooks/use-rick-morty';
import { PROMISE_STATUS } from '../constants';
import { useCallback, useEffect, useRef } from 'react';
import type { IRickMortyCharacter } from '../types';
import { CharacterCardDetail } from './character-card-detail';

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const [characterData, status] = useRickMorty<IRickMortyCharacter>(
    characterId ? +characterId : undefined
  );
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCloseDetails = useCallback(() => {
    navigate({ pathname: '/', search: searchParams.toString() });
  }, [navigate, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handleCloseDetails();
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [handleCloseDetails, navigate, searchParams]);

  if (status === null) return null;

  if (status === PROMISE_STATUS.PENDING) {
    return <h1>Loading character</h1>;
  }

  if (status === PROMISE_STATUS.REJECTED) {
    return <h1>{`Failed to get character ${characterData}`}</h1>;
  }

  const { name, image, origin } = characterData as IRickMortyCharacter;

  return (
    <div className="section box character-details" ref={ref}>
      <div className="is-flex is-align-items-start is-4">
        <h1 className="title is-1">{name}</h1>
        <button className="button mt-2 ml-4" onClick={handleCloseDetails}>
          Close
        </button>
      </div>
      <img src={image} title={name} />
      <CharacterCardDetail name="Origin" value={origin.name} />
    </div>
  );
};
