import { Outlet } from 'react-router';
import { useTheme } from '../hooks/use-theme';

export const Root = () => {
  const theme = useTheme();

  return (
    <div data-theme={theme} className="root has-background">
      <main className="container section">
        <Outlet />
      </main>
    </div>
  );
};
