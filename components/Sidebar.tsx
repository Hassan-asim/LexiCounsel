
import React from 'react';
import { ChatMode } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Mascot = () => (
    <div className="flex flex-col items-center px-4 pt-4 pb-2 text-center">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
            <Icon name="mascot" className="h-16 w-16 text-indigo-600 dark:text-indigo-300"/>
        </div>
        <h2 className="mt-4 text-lg font-bold font-serif text-gray-800 dark:text-gray-100">LexiCounsel</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your AI Legal Advocate</p>
    </div>
);

const SidebarButton: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
        <Icon name={icon} className="h-5 w-5 mr-3" />
        <span className="font-medium">{label}</span>
    </button>
);


export const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-16 shrink-0">
             <div className="w-16 h-16"></div>
        </div>

        <div className="flex-shrink-0">
            <Mascot />
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Specialties</h3>
            <SidebarButton
                icon="search"
                label="Legal Q&A"
                isActive={currentMode === ChatMode.QNA}
                onClick={() => onModeChange(ChatMode.QNA)}
            />
            <SidebarButton
                icon="document"
                label="Document Analysis"
                isActive={currentMode === ChatMode.DOC_ANALYSIS}
                onClick={() => onModeChange(ChatMode.DOC_ANALYSIS)}
            />
             <SidebarButton
                icon="family"
                label="Family Law"
                isActive={currentMode === ChatMode.FAMILY_LAW}
                onClick={() => onModeChange(ChatMode.FAMILY_LAW)}
            />
            <SidebarButton
                icon="gavel"
                label="Criminal Law"
                isActive={currentMode === ChatMode.CRIMINAL_LAW}
                onClick={() => onModeChange(ChatMode.CRIMINAL_LAW)}
            />
            <SidebarButton
                icon="property"
                label="Property Law"
                isActive={currentMode === ChatMode.PROPERTY_LAW}
                onClick={() => onModeChange(ChatMode.PROPERTY_LAW)}
            />
            <SidebarButton
                icon="briefcase"
                label="Business Law"
                isActive={currentMode === ChatMode.BUSINESS_LAW}
                onClick={() => onModeChange(ChatMode.BUSINESS_LAW)}
            />
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © 2024 LexiCounsel. AI-powered insights. Not a substitute for a lawyer.
            </p>
        </div>
         <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <Icon name="close" className="h-6 w-6"/>
        </button>
    </aside>
  );
};
