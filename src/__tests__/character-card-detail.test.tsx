import { render } from '@testing-library/react';
import { CharacterCardDetail } from '../components/character-card-detail';
import { test, expect } from 'vitest';

test('test character card detail component', async () => {
  const { getByText } = render(
    <CharacterCardDetail name="Name" value="Peter" />
  );

  expect(getByText('Name:')).toBeInTheDocument();
  expect(getByText('Peter')).toBeInTheDocument();
});
