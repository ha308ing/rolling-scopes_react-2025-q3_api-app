import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useRickMorty } from '../hooks/use-rick-morty';
import { useCallback, useEffect, useRef } from 'react';
import type { IRickMortyCharacter } from '../types';
import { CharacterInfo } from './character-info';

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const {
    data: characterData,
    isLoading,
    isError,
    isSuccess,
  } = useRickMorty<IRickMortyCharacter>(characterId);

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCloseDetails = useCallback(() => {
    navigate({ pathname: '/', search: searchParams.toString() });
  }, [navigate, searchParams]);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handleCloseDetails();
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [handleCloseDetails]);

  let content;

  if (isLoading) {
    content = <h2 className='title is-4 mt-4"'>Loading character</h2>;
  } else if (isError) {
    content = <h2 className="title is-4 mt-4">Failed to get character</h2>;
  } else if (isSuccess) {
    const { name } = characterData as IRickMortyCharacter;
    content = (
      <>
        <h2 className="title is-3 mt-4">{name}</h2>
        <CharacterInfo character={characterData as IRickMortyCharacter} />
      </>
    );
  }

  return (
    <div className="section box character-details" ref={ref}>
      <button
        className="button details-close-button"
        onClick={handleCloseDetails}
      >
        Close
      </button>
      {content}
    </div>
  );
};
