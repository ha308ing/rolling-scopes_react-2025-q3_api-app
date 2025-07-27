import { render } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import { Results, type IResultsProps } from '../components/results';
import type { IRickMortyResponse } from '../services/rick-morty';
import { MemoryRouter } from 'react-router';

const ResultsWithRouter = (props: IResultsProps) => (
  <MemoryRouter>
    <Results {...props} />
  </MemoryRouter>
);

describe('test results component', () => {
  test('pending status', async () => {
    const isLoading = true;
    const data = null;

    const { getAllByRole } = render(
      <ResultsWithRouter isLoading={isLoading} data={data} />
    );

    expect(getAllByRole('heading')[0]).toHaveTextContent('Loading');
  });

  test('rejected status', async () => {
    const isError = true;
    const data = null;

    const { getAllByRole } = render(
      <ResultsWithRouter isError={isError} data={data} />
    );

    expect(getAllByRole('heading')[0]).toHaveTextContent(
      /Failed to get characters/
    );
  });

  test('fulfilled status', async () => {
    const isSuccess = true;
    const data: IRickMortyResponse = {
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
    };

    const { getAllByRole } = render(
      <ResultsWithRouter isSuccess={isSuccess} data={data} />
    );

    expect(getAllByRole('heading')[0]).toHaveTextContent('sam');
  });
});
