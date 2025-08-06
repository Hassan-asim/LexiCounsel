
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { getAiResponseStream } from './services/geminiService';
import { Message, ChatMode, UploadedFile } from './types';
import { v4 as uuidv4 } from 'uuid';
import { SuggestedPrompts } from './components/SuggestedPrompts';

const CHAT_MODE_DETAILS: { [key in ChatMode]: { name: string; placeholder: string; prompts: string[] } } = {
  [ChatMode.QNA]: {
    name: 'Legal Q&A',
    placeholder: 'Ask a legal question...',
    prompts: [
      'Who won the most medals in the Paris Olympics 2024?',
      'What are the new traffic laws in Punjab?',
      'Summarize the latest federal budget of Pakistan.'
    ]
  },
  [ChatMode.DOC_ANALYSIS]: {
    name: 'Document Analysis',
    placeholder: 'Ask a question about your document...',
    prompts: [
      'Summarize this document.',
      'Are there any risky clauses for me?',
      'Explain the termination clause.'
    ]
  },
  [ChatMode.FAMILY_LAW]: {
    name: 'Family Law',
    placeholder: 'Ask about divorce, custody, etc...',
    prompts: [
      'How do I file for Khula in Pakistan?',
      'What are the laws for child custody?',
      'What is considered domestic violence?'
    ]
  },
  [ChatMode.CRIMINAL_LAW]: {
    name: 'Criminal Law',
    placeholder: 'Ask about FIR, bail, rights...',
    prompts: [
      'What is the process to file an FIR?',
      'What are my rights if I am arrested?',
      'How does bail work in Pakistan?'
    ]
  },
  [ChatMode.PROPERTY_LAW]: {
    name: 'Property Law',
    placeholder: 'Ask about property disputes, transfers...',
    prompts: [
      'How to verify property documents?',
      'What is the process for property transfer?',
      'Explain tenant rights in Punjab.'
    ]
  },
  [ChatMode.BUSINESS_LAW]: {
    name: 'Business Law',
    placeholder: 'Ask about company registration, contracts...',
    prompts: [
      'How to register a private limited company?',
      'What are the key elements of a valid contract?',
      'Explain trademark registration process.'
    ]
  },
};


export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.QNA);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

   useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome-message',
      sender: 'ai',
      text: `Welcome to LexiCounsel. I am your AI legal advocate. Unless you specify a different country, all my responses are based on the laws of Pakistan. The Legal Q&A mode is enhanced with Google Search for more accurate, up-to-date answers. \n\n*Disclaimer: I am an AI assistant and not a human lawyer. My advice should not be considered a substitute for professional legal counsel.*`,
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() && !uploadedFile) return;

    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text: inputText,
      fileInfo: uploadedFile ? { name: uploadedFile.name, type: uploadedFile.type } : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiResponseId = uuidv4();
    const aiMessage: Message = { id: aiResponseId, sender: 'ai', text: '' };
    setMessages(prev => [...prev, aiMessage]);

    try {
      const stream = getAiResponseStream(inputText, [...messages, userMessage], chatMode, uploadedFile);
      
      for await (const chunk of stream) {
        setMessages(prev => prev.map(msg => 
            msg.id === aiResponseId 
            ? { 
                ...msg, 
                text: msg.text + (chunk.text || ''),
                sources: chunk.sources || msg.sources,
              } 
            : msg
        ));
      }

    } catch (error) {
      console.error('Error streaming response:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        sender: 'ai',
        text: 'I apologize, but I encountered an error. Please check your API key and try again.'
      };
      setMessages(prev => prev.map(msg => msg.id === aiResponseId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
      setUploadedFile(null); // Clear file after sending
    }
  }, [messages, chatMode, uploadedFile]);

  const handleModeChange = (newMode: ChatMode) => {
    setChatMode(newMode);
    const modeDetails = CHAT_MODE_DETAILS[newMode];
    let welcomeText = `I am now ready to assist with ${modeDetails.name}.`;

    if (newMode === ChatMode.QNA) {
        welcomeText += ' I will use Google Search to provide more factual, up-to-date answers.';
    }
     if (newMode === ChatMode.DOC_ANALYSIS) {
        welcomeText += ' Please upload a document to get started.';
    }

    const modeChangeMessage: Message = {
      id: uuidv4(),
      sender: 'ai',
      text: `Switched to ${modeDetails.name} mode. ${welcomeText}`,
    };
    setMessages(prev => [...prev, modeChangeMessage]);
    setUploadedFile(null);
  };
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          aria-hidden="true"
        ></div>
      )}
      <Sidebar 
        currentMode={chatMode} 
        onModeChange={handleModeChange}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col flex-1 h-screen transition-all duration-300 lg:ml-64">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} theme={theme} toggleTheme={toggleTheme}/>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ChatWindow messages={messages} isLoading={isLoading} />
        </main>
        <div className="p-2 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
           <SuggestedPrompts
            prompts={CHAT_MODE_DETAILS[chatMode].prompts}
            onSendPrompt={handleSendMessage}
           />
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
            chatMode={chatMode}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            placeholder={CHAT_MODE_DETAILS[chatMode].placeholder}
          />
        </div>
      </div>
    </div>
  );
}
