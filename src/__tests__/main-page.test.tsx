import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MainPage } from '../pages/main-page';
import { getRickMortyCharacterByName } from '../services/rick-morty';
import { MemoryRouter, Route, Routes } from 'react-router';
import { CharacterDetails } from '../components/character-details';
import { useSelectCharactersStore } from '../hooks/use-select-characters-store';

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

  test('should display cards details with characterId param', async () => {
    vi.mocked(getRickMortyCharacterByName).mockReturnValueOnce([
      Promise.resolve({
        success: false,
        data: '404',
      }),
      {
        abort: vi.fn(),
      } as unknown as AbortController,
    ]);

    const { findByText } = render(
      <MemoryRouter initialEntries={['/12']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/:characterId" element={<CharacterDetails />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await findByText(/close/i);

    expect(closeButton).toBeInTheDocument();
  });

  test('should display padination for multiple pages', async () => {
    vi.mocked(getRickMortyCharacterByName).mockReturnValueOnce([
      Promise.resolve({
        success: true,
        data: {
          info: {
            pages: 2,
            page: 1,
            count: 1,
            next: '',
            prev: '',
          },
          results: [],
        },
      }),
      {
        abort: vi.fn(),
      } as unknown as AbortController,
    ]);

    const { findByLabelText } = render(
      <MemoryRouter initialEntries={['/12']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/:characterId" element={<CharacterDetails />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const pagination = await findByLabelText('pagination');

    expect(pagination).toBeInTheDocument();
  });

  describe('tests with selected characters store', () => {
    beforeEach(() => {
      useSelectCharactersStore.getState().clear();
    });

    test('should display drawer on character select', async () => {
      const { findByRole, findByText } = render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </MemoryRouter>
      );

      const checkbox = await findByRole('checkbox');

      await act(() => fireEvent.click(checkbox));

      const downloadButton = await findByText('Download');
      const selectedItemText = await findByText('Selected 1 characters');

      expect(downloadButton).toBeInTheDocument();
      expect(selectedItemText).toBeInTheDocument();
    });

    test('should hide drawer on unselect all', async () => {
      const { findByRole, findByText } = render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </MemoryRouter>
      );

      const checkbox = await findByRole('checkbox');

      await act(async () => {
        fireEvent.click(checkbox);
      });

      const downloadButton = await findByText('Download');

      const unselectButton = await findByText('Unselect all');

      await act(async () => {
        fireEvent.click(unselectButton);
      });

      expect(downloadButton).not.toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });
});
