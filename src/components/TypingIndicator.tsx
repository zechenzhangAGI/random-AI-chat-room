'use client';

import { motion } from 'framer-motion';
import { Character } from '@/lib/characters';
import { cn, getGradientFromColor } from '@/lib/utils';

interface TypingIndicatorProps {
  character?: Character;
  className?: string;
}

export function TypingIndicator({ character, className }: TypingIndicatorProps) {
  const gradientClass = character ? getGradientFromColor(character.accentColor) : 'from-gray-500 to-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-2xl max-w-xs",
        "bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {character && (
        <div className="flex-shrink-0">
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

      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {character?.name || 'AI'} is typing
        </span>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full",
                character ? `bg-gradient-to-r ${gradientClass}` : 'bg-gray-400'
              )}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}