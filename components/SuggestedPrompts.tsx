
import React from 'react';

interface SuggestedPromptsProps {
  prompts: string[];
  onSendPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSendPrompt }) => {
  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 px-3 md:px-2">
      <div className="flex flex-wrap items-center gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSendPrompt(prompt)}
            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
