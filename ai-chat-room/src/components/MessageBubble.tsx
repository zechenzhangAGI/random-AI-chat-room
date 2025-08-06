'use client';

import { motion } from 'framer-motion';
import { Character } from '@/lib/characters';
import { Message } from '@/lib/store';
import { cn, formatTime, getGradientFromColor } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  character?: Character;
  isOwn?: boolean;
  showAvatar?: boolean;
  showTime?: boolean;
  className?: string;
}

export function MessageBubble({ 
  message, 
  character, 
  isOwn = false, 
  showAvatar = true,
  showTime = true,
  className 
}: MessageBubbleProps) {
  const gradientClass = character ? getGradientFromColor(character.accentColor) : 'from-blue-500 to-purple-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "flex items-end space-x-2 max-w-[85%]",
        isOwn ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto",
        className
      )}
    >
      {/* Avatar */}
      {showAvatar && !isOwn && character && (
        <div className="flex-shrink-0 mb-1">
          <div className={cn(
            "w-8 h-8 rounded-full bg-gradient-to-br p-0.5",
            gradientClass
          )}>
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-1">
        {/* Character name (for group chats) */}
        {!isOwn && character && (
          <span 
            className="text-xs font-medium px-3"
            style={{ color: character.accentColor }}
          >
            {character.name}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "relative px-4 py-3 rounded-2xl shadow-sm",
            "break-words whitespace-pre-wrap",
            isOwn
              ? cn(
                  "bg-gradient-to-r text-white rounded-br-md",
                  gradientClass || "from-blue-500 to-purple-600"
                )
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>

          {/* Message tail */}
          <div
            className={cn(
              "absolute w-3 h-3 transform rotate-45",
              isOwn
                ? cn(
                    "-bottom-1 -right-1 bg-gradient-to-br",
                    gradientClass || "from-blue-500 to-purple-600"
                  )
                : "bottom-0 -left-1 bg-white dark:bg-gray-800 border-l border-b border-gray-200 dark:border-gray-700"
            )}
          />
        </div>

        {/* Timestamp */}
        {showTime && (
          <span className={cn(
            "text-xs text-gray-500 dark:text-gray-400 px-3",
            isOwn ? "text-right" : "text-left"
          )}>
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>

      {/* Own message avatar placeholder */}
      {showAvatar && isOwn && (
        <div className="w-8 h-8 flex-shrink-0 mb-1" />
      )}
    </motion.div>
  );
}