import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * PrivateRoute — wraps any route that requires authentication.
 * If user is not authenticated, redirects to /signin.
 * Uses <Outlet /> so it works as a layout wrapper for nested routes.
 */
const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // While loading persisted session, show a neutral spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#5E6AD2] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8A8A93] text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
