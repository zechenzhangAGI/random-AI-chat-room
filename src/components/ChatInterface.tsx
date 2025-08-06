'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageInput } from './MessageInput';
import { Character } from '@/lib/characters';
import { Message } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  currentCharacter?: Character;
  groupParticipants?: Character[];
  isTyping?: boolean;
  typingCharacterId?: string;
  disabled?: boolean;
  className?: string;
}

export function ChatInterface({
  messages,
  onSendMessage,
  currentCharacter,
  groupParticipants = [],
  isTyping = false,
  typingCharacterId,
  disabled = false,
  className
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isGroupChat = groupParticipants.length > 0;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getCharacterForMessage = (message: Message): Character | undefined => {
    if (message.role === 'user') return undefined;
    
    if (isGroupChat && message.characterId) {
      return groupParticipants.find(char => char.id === message.characterId);
    }
    
    return currentCharacter;
  };

  const getTypingCharacter = (): Character | undefined => {
    if (!typingCharacterId) return currentCharacter;
    return groupParticipants.find(char => char.id === typingCharacterId) || currentCharacter;
  };

  return (
    <div className={cn("flex flex-col h-full bg-gray-50 dark:bg-gray-900", className)}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 space-y-4 pb-20">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => {
              const messageCharacter = getCharacterForMessage(message);
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  character={messageCharacter}
                  isOwn={message.role === 'user'}
                  showAvatar={true}
                  showTime={true}
                />
              );
            })}
            
            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                key="typing"
                layout
                className="flex justify-start"
              >
                <TypingIndicator character={getTypingCharacter()} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <MessageInput
        onSendMessage={onSendMessage}
        disabled={disabled}
        placeholder={
          isGroupChat 
            ? "Chat with the group..." 
            : currentCharacter 
              ? `Message ${currentCharacter.name}...`
              : "Type your message..."
        }
      />
    </div>
  );
}