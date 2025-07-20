import { render, fireEvent, act } from '@testing-library/react';
import { test, describe, expect, vi, beforeEach } from 'vitest';
import { ErrorButton } from './error-button';
import { ErrorBoundary } from './error-boundary';

describe('test error boundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should display error message', async () => {
    const { getByRole } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = getByRole('button');

    act(() => fireEvent.click(errorButton));

    const message = getByRole('heading');

    expect(message).toHaveTextContent('Error Happened');
  });

  test('should display reload button', async () => {
    const reloadSpy = vi.fn();

    vi.stubGlobal('location', { reload: reloadSpy });

    const { getByRole } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = getByRole('button');

    await act(() => fireEvent.click(errorButton));

    const reloadButton = getByRole('button');

    await act(() => fireEvent.click(reloadButton));

    expect(reloadSpy).toBeCalled();
  });

  test('should log error message', async () => {
    const logSpy = vi.spyOn(console, 'error');

    const { getByRole } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = getByRole('button');

    act(() => fireEvent.click(errorButton));

    expect(logSpy).toBeCalled();
  });
});
