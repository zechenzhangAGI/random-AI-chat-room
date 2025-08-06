'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message...",
  className 
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-end space-x-3">
          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={cn(
                "w-full resize-none border border-gray-300 dark:border-gray-600 rounded-2xl",
                "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white",
                "placeholder-gray-500 dark:placeholder-gray-400",
                "px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "transition-all duration-200 max-h-32 overflow-y-auto",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              style={{ minHeight: '48px' }}
            />

            {/* Emoji button */}
            <button
              type="button"
              className="absolute right-3 bottom-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => {
                // Simple emoji insertion - in a real app you'd use an emoji picker
                const emojis = ['😊', '😄', '🤔', '👍', '❤️', '🎉', '🔥', '✨'];
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                setMessage(prev => prev + randomEmoji);
              }}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Send button */}
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full",
              "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
              "shadow-lg hover:shadow-xl transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Character count indicator */}
        {message.length > 200 && (
          <div className="absolute -top-6 right-0 text-xs text-gray-500">
            {message.length}/500
          </div>
        )}
      </form>
    </motion.div>
  );
}