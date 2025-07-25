import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AboutPage } from './about-page';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('test about page', () => {
  test('should display info about author', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MemoryRouter>
    );

    const authorInfo = getByText(/ivan/i);

    expect(authorInfo).toBeInTheDocument();
  });
});
