import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const PrivateRoute = ({ children }) => {
  const { adminLogged, isLoading } = useStudio();

  // Aspetta il caricamento del contesto
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Caricamento...</p>
      </div>
    </div>;
  }

  if (!adminLogged) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;
