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
    const onChange = vitest.fn();
    const onSearch = vitest.fn();

    const { getByRole } = render(
      <SearchControlsWithRouter
        onChange={onChange}
        value={inputValue}
        onSearch={onSearch}
      />
    );

    expect(getByRole('textbox')).toHaveValue('peter');
  });

  test('should call passed search handler', async () => {
    const inputValue = 'peter';
    const onChange = vitest.fn();
    const onSearch = vitest.fn();
    const isLoading = true;

    const { getByText } = render(
      <SearchControlsWithRouter
        onChange={onChange}
        value={inputValue}
        onSearch={onSearch}
        isLoading={isLoading}
      />
    );

    const button = getByText(/search/i);

    act(() => {
      fireEvent.click(button);
    });

    expect(onSearch).toBeCalled();
  });
});
