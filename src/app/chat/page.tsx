'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SkipForward, User, Info, Home } from 'lucide-react';
import Link from 'next/link';
import { CharacterCard } from '@/components/CharacterCard';
import { ChatInterface } from '@/components/ChatInterface';
import { useChatStore } from '@/lib/store';
import { getRandomCharacter } from '@/lib/characters';
import { cn, fadeInUp, slideInFromRight } from '@/lib/utils';

export default function ChatPage() {
  const {
    currentCharacter,
    setCurrentCharacter,
    singleChatMessages,
    addSingleChatMessage,
    clearSingleChatMessages,
    setCurrentRoom,
    isTyping,
    setIsTyping
  } = useChatStore();

  const [isCharacterInfoOpen, setIsCharacterInfoOpen] = useState(false);

  // Initialize with a random character
  useEffect(() => {
    if (!currentCharacter) {
      const randomChar = getRandomCharacter();
      setCurrentCharacter(randomChar);
    }
    setCurrentRoom('chat');
  }, [currentCharacter, setCurrentCharacter, setCurrentRoom]);

  // Filter messages for current character
  const chatMessages = singleChatMessages.filter(
    msg => msg.characterId === currentCharacter?.id || msg.role === 'user'
  );

  const handleSendMessage = async (message: string) => {
    if (!currentCharacter) return;

    // Add user message
    addSingleChatMessage({
      content: message,
      role: 'user'
    });

    try {
      setIsTyping(true);
      
      // Get recent messages for context
      const recentMessages = chatMessages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...recentMessages, { role: 'user', content: message }],
          characterId: currentCharacter.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      if (data.content) {
        addSingleChatMessage({
          content: data.content,
          role: 'assistant',
          characterId: currentCharacter.id
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      addSingleChatMessage({
        content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        role: 'assistant',
        characterId: currentCharacter.id
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSkipCharacter = () => {
    const newCharacter = getRandomCharacter([currentCharacter?.id || '']);
    setCurrentCharacter(newCharacter);
    clearSingleChatMessages();
  };

  if (!currentCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="spinner mx-auto mb-4" />
          <p>Loading character...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Home className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <div className="flex items-center space-x-3">
              <CharacterCard 
                character={currentCharacter} 
                size="sm" 
                showDetails={false}
                className="cursor-pointer"
                onClick={() => setIsCharacterInfoOpen(true)}
              />
              <div>
                <h1 className="text-white font-semibold">
                  Chatting with {currentCharacter.name}
                </h1>
                <p className="text-gray-400 text-sm">
                  {currentCharacter.background.slice(0, 50)}...
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCharacterInfoOpen(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Info className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkipCharacter}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium transition-all duration-300 flex items-center space-x-2"
            >
              <SkipForward className="w-4 h-4" />
              <span>Next Character</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Interface */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex-1 flex flex-col"
        >
          <ChatInterface
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            currentCharacter={currentCharacter}
            isTyping={isTyping}
            disabled={isTyping}
          />
        </motion.div>

        {/* Character Info Sidebar */}
        <AnimatePresence>
          {isCharacterInfoOpen && (
            <motion.div
              variants={slideInFromRight}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-80 bg-black/30 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Character Info</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCharacterInfoOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Character Avatar */}
                <div className="text-center">
                  <CharacterCard 
                    character={currentCharacter} 
                    size="lg" 
                    showDetails={false}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {currentCharacter.name}
                  </h3>
                  <p className="text-gray-400">{currentCharacter.age} years old</p>
                </div>

                {/* Background */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Background</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentCharacter.background}
                  </p>
                </div>

                {/* Personality */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCharacter.personality.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCharacter.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{ 
                          backgroundColor: currentCharacter.accentColor + '20',
                          color: currentCharacter.accentColor,
                          border: `1px solid ${currentCharacter.accentColor}40`
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSkipCharacter}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium transition-all duration-300"
                  >
                    Chat with Someone New
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}