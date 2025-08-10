import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { CharacterDetails } from '../components/character-details';
import { fetchRickMorty } from '../utils/fetch-rick-morty';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../utils/fetch-rick-morty', () => ({
  fetchRickMorty: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      retryDelay: 0,
    },
  },
});

const CharacterDetailsWithRouter = () => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={['/12']} initialIndex={0}>
      <Routes>
        <Route path="/" element={null}>
          <Route path="/:characterId" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>
);

describe('test character details component', () => {
  beforeEach(() => {
    vi.mocked(fetchRickMorty).mockResolvedValue({
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
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('should call api with id from url parm', async () => {
    const { findByText } = render(<CharacterDetailsWithRouter />);

    await findByText(/close/i);

    const getByIdMock = vi.mocked(fetchRickMorty);

    expect(getByIdMock).toBeCalledWith('/12');
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
    vi.mocked(fetchRickMorty).mockRejectedValue({
      message: 'not here',
    });

    const { findByRole } = render(<CharacterDetailsWithRouter />);

    await waitFor(() => {
      expect(fetchRickMorty).toBeCalledTimes(3);
    });

    const heading = await findByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Failed to get character');
  });

  test('should display character name if success', async () => {
    const { findByRole } = render(<CharacterDetailsWithRouter />);

    await waitFor(() => {
      expect(fetchRickMorty).toHaveResolved();
    });

    const heading = await findByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('sam');
  });
});
