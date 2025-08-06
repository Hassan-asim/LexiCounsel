import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';
import { Spinner } from './Spinner';

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="h-full space-y-4 pr-4">
      {messages.map((msg, index) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            AI
          </div>
          <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-3 max-w-2xl shadow">
             <Spinner />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};