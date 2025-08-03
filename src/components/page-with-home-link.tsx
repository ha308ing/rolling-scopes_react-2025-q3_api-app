import type React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../constants';
import { useTheme } from '../hooks/use-theme';

interface IPageWithHomeLinkProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageWithHomeLink: React.FC<IPageWithHomeLinkProps> = ({
  title,
  children,
}) => {
  const theme = useTheme();

  return (
    <div className="root" data-theme={theme}>
      <section className="w-100 has-text-centered py-6">
        <h1 className="title is-1">{title}</h1>
        {children}
        <Link to={ROUTES.ROOT}>
          <button className="button">Go to main</button>
        </Link>
      </section>
    </div>
  );
};
