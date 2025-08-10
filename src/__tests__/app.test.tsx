import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { App } from '../app';
import { fetchRickMorty } from '../utils/fetch-rick-morty';

vi.mock('../utils/fetch-rick-morty', () => ({
  fetchRickMorty: vi.fn(),
}));

describe('test app', () => {
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

  test('should fill input with localstorage value', async () => {
    const { findByRole } = render(<App />);

    const searchInput = await findByRole('textbox');

    expect(searchInput).toHaveValue('hello');
  });

  test('should save input to localstorage', async () => {
    const localStorageSetSpy = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem: () => 'sam',
      setItem: localStorageSetSpy,
    });

    const { findByText } = render(<App />);
    const searchButton = await findByText(/search/i);

    act(() => {
      fireEvent.click(searchButton);
    });

    await findByText(/search/i);

    expect(localStorageSetSpy).toBeCalledWith('search-query', 'sam');
  });

  test('should display message if no characters found', async () => {
    vi.mocked(fetchRickMorty).mockRejectedValue({
      message: 'not here',
    });

    const { findByText } = render(<App />);

    await waitFor(
      () => {
        expect(fetchRickMorty).toBeCalledTimes(3);
      },
      { timeout: 6000 }
    );

    const message = await findByText(/failed to get/i);

    expect(message).toBeInTheDocument();
  });
});
