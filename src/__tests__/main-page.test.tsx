import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MainPage } from '../pages/main-page';
import { fetchRickMorty } from '../utils/fetch-rick-morty';
import { MemoryRouter, Route, Routes } from 'react-router';
import { CharacterDetails } from '../components/character-details';
import { useSelectCharactersStore } from '../hooks/use-select-characters-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      retryDelay: 0,
    },
  },
});

vi.mock('../utils/fetch-rick-morty', () => ({
  fetchRickMorty: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('test main page', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: () => 'hello',
      setItem: vi.fn(),
    });

    vi.mocked(fetchRickMorty).mockResolvedValue({
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
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('should fill input with localstorage value', async () => {
    const { findByRole } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
      { wrapper }
    );

    const searchInput = await findByRole('textbox');

    expect(searchInput).toHaveValue('hello');
  });

  test('should save input to localstorage', async () => {
    const localStorageSetSpy = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem: () => 'sam',
      setItem: localStorageSetSpy,
    });

    const { findByText } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
      { wrapper }
    );
    const searchButton = await findByText(/search/i);

    act(() => {
      fireEvent.click(searchButton);
    });

    await findByText(/search/i);

    expect(localStorageSetSpy).toBeCalledWith('search-query', 'sam');
  });

  test('should display message if no characters found', async () => {
    vi.mocked(fetchRickMorty).mockRejectedValue({
      error: {
        message: 'nothing here',
      },
    });

    const { findByText } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
      { wrapper }
    );

    const message = await findByText(/failed to get/i);

    expect(message).toBeInTheDocument();
  });

  test('should display cards details with characterId param', async () => {
    vi.mocked(fetchRickMorty).mockRejectedValue({
      error: {
        message: 'nothing here',
      },
    });

    const { findByText } = render(
      <MemoryRouter initialEntries={['/12']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/:characterId" element={<CharacterDetails />} />
          </Route>
        </Routes>
      </MemoryRouter>,
      {
        wrapper,
      }
    );

    const closeButton = await findByText(/close/i);

    expect(closeButton).toBeInTheDocument();
  });

  test('should display padination for multiple pages', async () => {
    vi.mocked(fetchRickMorty).mockResolvedValue({
      info: {
        pages: 2,
        page: 1,
        count: 1,
        next: '',
        prev: '',
      },
      results: [],
    });

    const { findByLabelText } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>,
      { wrapper }
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
        </MemoryRouter>,
        { wrapper }
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
        </MemoryRouter>,
        { wrapper }
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
