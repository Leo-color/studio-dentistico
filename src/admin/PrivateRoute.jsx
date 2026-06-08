import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const PrivateRoute = ({ children }) => {
  const { adminLogged } = useStudio();

  if (!adminLogged) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;
