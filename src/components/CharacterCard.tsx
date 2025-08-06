'use client';

import { motion } from 'framer-motion';
import { Character } from '@/lib/characters';
import { cn, getGradientFromColor } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  isActive?: boolean;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CharacterCard({ 
  character, 
  onClick, 
  isActive = false, 
  showDetails = true,
  size = 'md',
  className 
}: CharacterCardProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const gradientClass = getGradientFromColor(character.accentColor);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer",
        onClick && "hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className={cn(
        "relative",
        isActive && "ring-2 ring-offset-2 ring-opacity-50",
        isActive && `ring-[${character.accentColor}]`,
        "rounded-full transition-all duration-300"
      )}>
        {/* Avatar with gradient border */}
        <div className={cn(
          "relative p-1 rounded-full bg-gradient-to-br",
          gradientClass,
          sizeClasses[size]
        )}>
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full p-0.5">
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Online indicator */}
        <div 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900"
          style={{ backgroundColor: character.accentColor }}
        />
      </div>

      {/* Character details tooltip/card */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          className={cn(
            "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50",
            "bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700",
            "p-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "pointer-events-none group-hover:pointer-events-auto"
          )}
        >
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {character.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {character.age} years old
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
              {character.background}
            </p>
            
            {/* Personality traits */}
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {character.personality.slice(0, 3).map((trait) => (
                <span
                  key={trait}
                  className={cn(
                    "px-2 py-1 text-xs rounded-full text-white",
                    `bg-gradient-to-r ${gradientClass}`
                  )}
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Interests */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Loves: </span>
              {character.interests.slice(0, 2).join(', ')}
            </div>
          </div>

          {/* Arrow pointing to avatar */}
          <div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"
          />
        </motion.div>
      )}
    </motion.div>
  );
}