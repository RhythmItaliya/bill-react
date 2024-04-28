import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex-col flex h-screen items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;