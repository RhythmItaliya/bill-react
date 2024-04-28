import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ condition: boolean; children: React.ReactNode }> = ({ condition, children }) => {

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return condition ? children : (
    <>
      {clearLocalStorage()}
      <Navigate to="/auth/signup" />
    </>
  );

};