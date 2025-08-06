import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message as MessageType } from '../types';
import { Icon } from './Icon';

interface MessageProps {
  message: MessageType;
}

const Sources: React.FC<{ sources: MessageType['sources'] }> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
      <h4 className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Sources:</h4>
      <ul className="space-y-1">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">{index + 1}.</span>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-300 hover:underline break-all"
              title={source.title}
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const UserAvatar = () => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
      <Icon name="user" className="h-6 w-6 text-white" />
    </div>
  );

  const AiAvatar = () => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
      <Icon name="mascot" className="h-6 w-6 text-white"/>
    </div>
  );

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserAvatar /> : <AiAvatar />}
      <div className={`max-w-3xl rounded-lg px-4 py-3 shadow ${isUser ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200'}`}>
        {message.fileInfo && (
           <div className="mb-2 p-2 bg-black/10 dark:bg-black/20 rounded-md flex items-center gap-2 text-sm">
             <Icon name="document" className="h-5 w-5 flex-shrink-0"/>
             <span className="truncate font-medium">{message.fileInfo.name}</span>
           </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
           <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-xl font-bold" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-semibold" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-200 dark:bg-gray-600 rounded px-1 py-0.5 text-sm" {...props} />,
              pre: ({node, ...props}) => <pre className="bg-gray-200 dark:bg-gray-600 rounded p-2 text-sm overflow-x-auto" {...props} />,
            }}
           >
            {message.text}
          </ReactMarkdown>
        </div>
         <Sources sources={message.sources} />
      </div>
    </div>
  );
};