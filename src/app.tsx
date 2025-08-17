import { createBrowserRouter } from 'react-router';
import { ROUTES } from './constants';
import Page404 from './page-components/404-page';
import MainPage from './page-components/main-page';
import AboutPage from './page-components/about-page';
import { CharacterDetails } from './components/character-details';
import { RouterProvider } from 'react-router';
import Root from './page-components/root';
import { ProtectedCharacterIdRoute } from './protected-routes/character-id-route';
import { ThemeProvier } from './providers/theme-provider';
import { QueryClientProvider } from './providers/query-client-provider';

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
    ],
    errorElement: <Page404 />,
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutPage />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Page404 />,
  },
]);

const App = () => (
  <QueryClientProvider>
    <ThemeProvier>
      <RouterProvider router={router} />
    </ThemeProvier>
  </QueryClientProvider>
);

export default App;
