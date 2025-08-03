import type React from 'react';
import { Navigate, useParams } from 'react-router';
import { ROUTES } from '../constants';

export const ProtectedCharacterIdRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { characterId } = useParams();

  if (characterId && Number.isNaN(Number(characterId))) {
    return <Navigate to={ROUTES.NOT_FOUND} />;
  }

  return children;
};
