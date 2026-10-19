import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyAdminToken } from '../utils/analytics';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!verifyAdminToken()) {
    return <Navigate to="/workshop/login" replace />;
  }

  return <>{children}</>;
}
