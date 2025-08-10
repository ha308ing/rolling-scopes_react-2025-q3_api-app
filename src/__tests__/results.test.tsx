import { render } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import { Results, type IResultsProps } from '../components/results';
import type { IRickMortyResponse } from '../types';
import { MemoryRouter } from 'react-router';
import type { UseQueryResult } from '@tanstack/react-query';

const ResultsWithRouter = (props: IResultsProps) => (
  <MemoryRouter>
    <Results {...props} />
  </MemoryRouter>
);

describe('test results component', () => {
  test('pending status', async () => {
    const query = {
      isLoading: true,
    } as UseQueryResult<IRickMortyResponse>;

    const { getAllByRole } = render(<ResultsWithRouter query={query} />);

    expect(getAllByRole('heading')[0]).toHaveTextContent('Loading');
  });

  test('rejected status', async () => {
    const query = {
      isError: true,
      error: {
        message: 'not found',
      },
    } as UseQueryResult<IRickMortyResponse>;

    const { getAllByRole } = render(<ResultsWithRouter query={query} />);

    expect(getAllByRole('heading')[0]).toHaveTextContent(
      /Failed to get characters: not found/
    );
  });

  test('fulfilled status', async () => {
    const query = {
      isSuccess: true,
      data: {
        info: {
          count: 0,
          pages: 0,
          next: '',
          prev: '',
        },
        results: [
          {
            id: 13,
            name: 'sam',
            status: '',
            species: '',
            type: '',
            gender: '',
            origin: {
              name: '',
              url: '',
            },
            location: {
              name: '',
              url: '',
            },
            image: 'image-url',
            episode: [],
            url: '',
            created: '',
          },
        ],
      },
    } as UseQueryResult<IRickMortyResponse>;

    const { getAllByRole } = render(<ResultsWithRouter query={query} />);

    expect(getAllByRole('heading')[0]).toHaveTextContent('sam');
  });
});
