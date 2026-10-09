'use client'

import { Navigate, useLocation } from '@/components/NextRouter';
import { useAuth } from '../../context/AuthContext';

/**
 * Wraps a route that requires authentication.
 * Redirects to /login with a `from` state so the user
 * can be sent back after signing in.
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, sessionChecked } = useAuth();
  const location = useLocation();

  // Wait until the session check (verifyToken) has completed
  // to avoid a flash-redirect before we know if the user is logged in.
  if (!sessionChecked) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
