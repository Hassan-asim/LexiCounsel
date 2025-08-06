
import React, { useState, useRef, useEffect } from 'react';
import { ChatMode, UploadedFile } from '../types';
import { Icon } from './Icon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  chatMode: ChatMode;
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  placeholder: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, chatMode, uploadedFile, setUploadedFile, placeholder }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (isLoading) return;
    onSendMessage(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const base64 = (loadEvent.target?.result as string)?.split(',')[1];
        if(base64){
            setUploadedFile({
                name: file.name,
                type: file.type,
                base64: base64
            });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
      {uploadedFile && (
        <div className="px-3 py-2 mb-2 text-sm bg-indigo-100 dark:bg-indigo-900/50 rounded-md flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
             <Icon name="document" className="h-5 w-5 text-indigo-600 dark:text-indigo-300"/>
             <span className="font-medium text-indigo-800 dark:text-indigo-200 truncate">{uploadedFile.name}</span>
          </div>
          <button onClick={() => setUploadedFile(null)} className="p-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800">
             <Icon name="close" className="h-4 w-4 text-indigo-600 dark:text-indigo-300"/>
          </button>
        </div>
      )}
      <div className="flex items-start gap-2">
        {chatMode === ChatMode.DOC_ANALYSIS && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || !!uploadedFile}
            className="p-2 mt-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Icon name="upload" className="h-6 w-6" />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg" />
          </button>
        )}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 p-2 bg-transparent focus:outline-none resize-none dark:text-gray-200"
          rows={1}
          disabled={isLoading}
          style={{maxHeight: '10rem', overflowY: 'auto'}}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || (!text.trim() && !uploadedFile)}
          className="p-2 mt-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed self-end flex-shrink-0"
        >
          <Icon name="send" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
