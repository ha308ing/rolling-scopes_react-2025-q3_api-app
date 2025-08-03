import { act, fireEvent, render } from '@testing-library/react';
import { test, expect, describe, beforeEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { CharacterDetails } from '../components/character-details';
import { getRickMortyCharacterById } from '../services/rick-morty';

const CharacterDetailsWithRouter = () => (
  <MemoryRouter initialEntries={['/12']} initialIndex={0}>
    <Routes>
      <Route path="/" element={null}>
        <Route path="/:characterId" element={<CharacterDetails />} />
      </Route>
    </Routes>
  </MemoryRouter>
);

describe('test character details component', () => {
  beforeEach(() => {
    vi.mock('../services/rick-morty', () => ({
      getRickMortyCharacterById: vi.fn().mockReturnValue([
        Promise.resolve({
          success: true,
          data: {
            created: '',
            episode: ['1', '2'],
            id: 0,
            name: 'sam',
            status: 'alive',
            species: 'human',
            type: 'human',
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
        }),
        {
          abort: vi.fn(),
        },
      ]),
      getRickMortyCharacterByName: vi.fn(),
    }));
  });

  test('should call api with id from url parm', async () => {
    const { findByText } = render(<CharacterDetailsWithRouter />);

    await findByText(/close/i);

    const getByIdMock = vi.mocked(getRickMortyCharacterById);

    expect(getByIdMock).toBeCalledWith(12);
  });

  test('should hide details on close', async () => {
    const { findByText } = render(<CharacterDetailsWithRouter />);

    const button = await findByText(/close/i);

    act(() => {
      fireEvent.click(button);
    });

    expect(button).not.toBeInTheDocument();
  });

  test('should hide details on click outside', async () => {
    const { findByText } = render(<CharacterDetailsWithRouter />);

    const button = await findByText(/close/i);

    act(() => {
      fireEvent.click(document.body);
    });

    expect(button).not.toBeInTheDocument();
  });

  test('should display error on rejected result', async () => {
    vi.mocked(getRickMortyCharacterById).mockReturnValueOnce([
      Promise.resolve({
        success: false,
        data: '',
      }),
      {
        abort: vi.fn(),
      } as unknown as AbortController,
    ]);

    const { findByRole } = render(<CharacterDetailsWithRouter />);

    const heading = await findByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Failed to get character');
  });
});
