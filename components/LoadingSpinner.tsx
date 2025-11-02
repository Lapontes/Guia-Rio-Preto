
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
      <p className="text-lg text-gray-400">Buscando locais...</p>
    </div>
  );
};

export default LoadingSpinner;
