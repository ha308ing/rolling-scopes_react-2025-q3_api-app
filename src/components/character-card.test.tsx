import { render } from '@testing-library/react';
import { CharacterCard, type ICharacterCardProps } from './character-card';
import { test, expect, describe } from 'vitest';
import type { IRickMortyCharacter } from '../types';
import { MemoryRouter } from 'react-router';

const CharacterCardWithRouter = (props: ICharacterCardProps) => (
  <MemoryRouter>
    <CharacterCard {...props} />
  </MemoryRouter>
);

const characterWithoutType: IRickMortyCharacter = {
  created: '',
  episode: ['1', '2'],
  id: 0,
  name: 'sam',
  status: 'alive',
  species: 'human',
  type: '',
  gender: 'female',
  origin: {
    name: 'earth',
    url: '',
  },
  location: {
    name: 'earch',
    url: '',
  },
  image: 'image-url',
  url: '',
};

describe('test character card component', () => {
  test('should display name and type', async () => {
    const character: IRickMortyCharacter = {
      ...characterWithoutType,
      type: 'human',
    };

    const { getAllByRole, getByText } = render(
      <CharacterCardWithRouter character={character} />
    );

    expect(getAllByRole('heading')[0]).toHaveTextContent('sam');
    expect(getByText('Type:')).toBeInTheDocument();
  });

  test('should not display type if empty', async () => {
    const { getAllByRole } = render(
      <CharacterCardWithRouter character={characterWithoutType} />
    );

    expect(getAllByRole('heading')[0]).toHaveTextContent('sam');
  });
});
