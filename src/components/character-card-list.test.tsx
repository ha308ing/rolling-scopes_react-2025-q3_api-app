import { render } from '@testing-library/react';
import { CharacterCardList } from './character-card-list';
import { test, expect } from 'vitest';
import type { IRickMortyCharacter } from '../types';

test('test character card list component', async () => {
  const results: IRickMortyCharacter[] = [
    {
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
    },

    {
      created: '',
      episode: ['1', '2'],
      id: 2,
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
    },
  ];

  const { getAllByRole } = render(<CharacterCardList results={results} />);

  expect(getAllByRole('img')[0]).toHaveAttribute('src', 'image-url');
  expect(getAllByRole('article')).toHaveLength(2);
});
