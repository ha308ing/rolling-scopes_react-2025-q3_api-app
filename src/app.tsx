import { createBrowserRouter } from 'react-router';
import { ROUTES } from './constants';
import { Page404 } from './pages/404-page';
import { MainPage } from './pages/main-page';
import { AboutPage } from './pages/about-page';
import { CharacterDetails } from './components/character-details';
import { RouterProvider } from 'react-router';
import { Root } from './pages/root';
import { ProtectedCharacterIdRoute } from './protected-routes/character-id-route';
import { ThemeProvier } from './providers/theme-provider';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <MainPage />,
        children: [
          {
            path: ROUTES.CHARACTER_ID_PARAM,
            element: (
              <ProtectedCharacterIdRoute>
                <CharacterDetails />
              </ProtectedCharacterIdRoute>
            ),
          },
        ],
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
    ],
    errorElement: <Page404 />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Page404 />,
  },
]);

export const App = () => (
  <ThemeProvier>
    <RouterProvider router={router} />
  </ThemeProvier>
);
