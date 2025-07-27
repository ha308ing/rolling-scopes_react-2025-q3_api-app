import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Pagination } from '../components/pagination';

describe('test pagination', () => {
  test('should not render if page count is 0', () => {
    const props = { page: 0, pageCount: 0, setPage: vi.fn() };
    const { container } = render(<Pagination {...props} />);

    expect(container).toContainHTML('');
  });

  test('should go to first page', () => {
    const setPageMock = vi.fn();
    const props = { page: 2, pageCount: 2, setPage: setPageMock };
    const { getByText } = render(<Pagination {...props} />);

    const button = getByText('1');

    fireEvent.click(button);

    expect(setPageMock).toBeCalledWith(1);
  });

  test('should display 2 ellipis in middle', () => {
    const setPageMock = vi.fn();
    const props = { page: 50, pageCount: 100, setPage: setPageMock };
    const { getAllByText } = render(<Pagination {...props} />);

    const ellipsises = getAllByText('…');

    expect(ellipsises).toHaveLength(2);
  });

  test('should go to last page', () => {
    const setPageMock = vi.fn();
    const props = { page: 50, pageCount: 100, setPage: setPageMock };
    const { getByText } = render(<Pagination {...props} />);

    const button = getByText('100');

    fireEvent.click(button);

    expect(setPageMock).toBeCalledWith(100);
  });
});
