
import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  theme: string;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen, theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex-shrink-0">
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
      >
        <Icon name="menu" className="h-6 w-6" />
      </button>
      <div className="flex items-center">
        <h1 className="text-xl font-semibold font-serif">LexiCounsel</h1>
      </div>
       <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
       >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} className="h-6 w-6" />
       </button>
    </header>
  );
};
