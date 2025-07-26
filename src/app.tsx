import { createBrowserRouter } from 'react-router';
import { ROUTES } from './constants';
import { Page404 } from './pages/404-page';
import { MainPage } from './pages/main-page';
import { AboutPage } from './pages/about-page';
import { CharacterDetails } from './components/character-details';
import { RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <MainPage />,
    children: [
      {
        path: ROUTES.CHARACTER_ID_PARAM,
        element: <CharacterDetails />,
      },
    ],
    errorElement: <Page404 />,
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;
