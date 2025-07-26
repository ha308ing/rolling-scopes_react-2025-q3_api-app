import { render, fireEvent, act } from '@testing-library/react';
import { test, expect, describe, vitest } from 'vitest';
import { SearchControls, type ISearchControlsProps } from './search-controls';
import { MemoryRouter } from 'react-router';

const SearchControlsWithRouter = (props: ISearchControlsProps) => (
  <MemoryRouter>
    <SearchControls {...props} />
  </MemoryRouter>
);

describe('test search controls component', () => {
  test('should display passed value', async () => {
    const inputValue = 'peter';
    const onSearch = vitest.fn();

    const { getByRole } = render(
      <SearchControlsWithRouter initialValue={inputValue} onSearch={onSearch} />
    );

    expect(getByRole('textbox')).toHaveValue('peter');
  });

  test('should call passed search handler', async () => {
    const inputValue = 'peter';
    const onSearch = vitest.fn();
    const isLoading = true;

    const { findByText, findByRole } = render(
      <SearchControlsWithRouter
        initialValue={inputValue}
        onSearch={onSearch}
        isLoading={isLoading}
      />
    );

    const input = await findByRole('textbox');
    const button = await findByText(/search/i);

    act(() => {
      fireEvent.change(input, { target: { value: 'sam' } });
      fireEvent.click(button);
    });

    expect(onSearch).toBeCalledWith('sam');
  });
});
