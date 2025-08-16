import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import type { IRickMortyCharacter } from '../types';
import { CharacterInfo } from './character-info';
import { ROUTES } from '../constants';
import { useRickMortyId } from '../hooks/use-rick-morty-id';

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const {
    query: { data: characterData, isLoading, isError, isSuccess },
    invalidateQueryCache,
  } = useRickMortyId(characterId ?? '');

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCloseDetails = useCallback(() => {
    navigate({ pathname: ROUTES.ROOT, search: searchParams.toString() });
  }, [navigate, searchParams]);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLElement)
      ) {
        handleCloseDetails();
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [handleCloseDetails]);

  let content;

  if (isLoading) {
    content = <CharacterDetailsStatus message="Loading" />;
  } else if (isError) {
    content = (
      <CharacterDetailsStatus message="Failed to get character">
        <button className="button" onClick={invalidateQueryCache}>
          Reload
        </button>
      </CharacterDetailsStatus>
    );
  } else if (isSuccess) {
    const { name } = characterData as IRickMortyCharacter;
    content = (
      <>
        <h2 className="title is-3 mt-4">{name}</h2>
        <CharacterInfo character={characterData} />
      </>
    );
  }

  return (
    <div className="section box character-details" ref={containerRef}>
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

const CharacterDetailsStatus: React.FC<{
  message: string;
  children?: React.ReactNode;
}> = ({ message, children }) => (
  <section className="section has-text-centered">
    <h2 className='title is-4 mt-4"'>{message}</h2>
    {children}
  </section>
);
