import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from './constants';
import { Page404 } from './pages/404-page';
import { MainPage } from './pages/main-page';
import { AboutPage } from './pages/about-page';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.ROOT} element={<MainPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);
