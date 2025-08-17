import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the admin is logged in from session storage
  const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';

  // If logged in, render the child routes (the protected pages).
  // Otherwise, redirect to the /login page.
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;