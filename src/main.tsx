import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { App } from './app.tsx';

const rootElement = document.getElementById('root');

if (rootElement == null) {
  throw new Error('no root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
