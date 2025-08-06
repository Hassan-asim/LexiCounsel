
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-pulse"></div>
      <span className="text-sm text-gray-500 dark:text-gray-400">LexiCounsel is thinking...</span>
    </div>
  );
};
