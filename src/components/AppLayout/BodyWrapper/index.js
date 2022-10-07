import React from 'react';

const BodyWrapper = ({children}) => {
  return (
    <div className="relative min-h-screen">
      <main className="w-full min-h-screen">
        <div className="flex h-screen bg-gray-200">
          {children}
        </div>
      </main>
    </div>
  );
};

export default BodyWrapper;