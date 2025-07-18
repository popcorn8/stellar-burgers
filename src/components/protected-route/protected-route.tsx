import { Navigate } from 'react-router-dom';
import { FC } from 'react';

interface ProtectedRouteProps {
  element: JSX.Element;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const isAuth = false;

  if (onlyUnAuth && isAuth) return <Navigate to='/' replace />;
  if (!onlyUnAuth && !isAuth) return <Navigate to='/login' replace />;

  return element;
};
