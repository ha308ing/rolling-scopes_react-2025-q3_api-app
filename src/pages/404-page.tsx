import { Link } from 'react-router';
import { ROUTES } from '../constants';

export const Page404 = () => (
  <main className="w-100 has-text-centered py-6">
    <h1 className="title is-1">Page not found</h1>
    <Link to={ROUTES.ROOT}>
      <button className="button">Go to main</button>
    </Link>
  </main>
);
