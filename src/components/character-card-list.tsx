import React from 'react';
import { CharacterCard } from './character-card';
import type { IRickMortyCharacter } from '../types';

interface ICharacterCardListProps {
  results: IRickMortyCharacter[];
}

export class CharacterCardList extends React.Component<ICharacterCardListProps> {
  render() {
    return (
      <div className="block fixed-grid has-1-cols has-2-cols-tablet has-text-left">
        <section className="grid is-gap-4">
          {this.props.results.map((result) => (
            <CharacterCard key={result.id} character={result} />
          ))}
        </section>
      </div>
    );
  }
}
