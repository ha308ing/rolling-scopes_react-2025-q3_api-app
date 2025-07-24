import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MainPage } from './main-page';
import { getRickMortyCharacterByName } from '../services/rick-morty';
import { MemoryRouter } from 'react-router';

const MainPageWithRouter = () => (
  <MemoryRouter>
    <MainPage />
  </MemoryRouter>
);

describe('test main page', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: () => 'hello',
      setItem: vi.fn(),
    });

    vi.mock('../services/rick-morty', () => ({
      getRickMortyCharacterByName: vi.fn().mockReturnValue([
        Promise.resolve({
          success: true,
          data: {
            info: {
              pages: 1,
              page: 1,
              count: 1,
              next: '',
            },
            results: [
              {
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
            ],
          },
        }),
        {
          abort: vi.fn(),
        },
      ]),
    }));
  });

  test('should fill input with localstorage value', async () => {
    const { findByRole } = render(<MainPageWithRouter />);

    const searchInput = await findByRole('textbox');

    expect(searchInput).toHaveValue('hello');
  });

  test('should save input to localstorage', async () => {
    const localStorageSetSpy = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem: () => 'sam',
      setItem: localStorageSetSpy,
    });

    const { findByText } = render(<MainPageWithRouter />);
    const searchButton = await findByText(/search/i);

    act(() => {
      fireEvent.click(searchButton);
    });

    await findByText(/search/i);

    expect(localStorageSetSpy).toBeCalledWith('search-query', 'sam');
  });

  test('should display message if no characters found', async () => {
    vi.mocked(getRickMortyCharacterByName).mockReturnValueOnce([
      Promise.resolve({
        success: false,
        data: '404',
      }),
      {
        abort: vi.fn(),
      } as unknown as AbortController,
    ]);

    const { findByText } = render(<MainPageWithRouter />);

    const message = await findByText(/failed to get/i);

    expect(message).toBeInTheDocument();
  });
});
