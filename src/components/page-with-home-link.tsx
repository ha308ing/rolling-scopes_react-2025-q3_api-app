import type React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../constants';

interface IPageWithHomeLinkProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageWithHomeLink: React.FC<IPageWithHomeLinkProps> = ({
  title,
  children,
}) => (
  <main className="w-100 has-text-centered py-6">
    <h1 className="title is-1">{title}</h1>
    {children}
    <Link to={ROUTES.ROOT}>
      <button className="button">Go to main</button>
    </Link>
  </main>
);
