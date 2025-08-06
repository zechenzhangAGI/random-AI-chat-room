'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Play, Pause, Settings } from 'lucide-react';
import Link from 'next/link';
import { CharacterCard } from '@/components/CharacterCard';
import { ChatInterface } from '@/components/ChatInterface';
import { useChatStore } from '@/lib/store';
import { getRandomCharacters, Character } from '@/lib/characters';
import { cn, fadeInUp, slideInFromLeft } from '@/lib/utils';

export default function GroupChatPage() {
  const {
    groupParticipants,
    setGroupParticipants,
    messages,
    addMessage,
    clearMessages,
    setCurrentRoom,
    isTyping,
    setIsTyping,
    typingCharacterId,
    setTypingCharacterId
  } = useChatStore();

  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize with random characters
  useEffect(() => {
    if (groupParticipants.length === 0) {
      const randomParticipants = getRandomCharacters(5);
      setGroupParticipants(randomParticipants);
    }
    setCurrentRoom('group');
  }, [groupParticipants.length, setGroupParticipants, setCurrentRoom]);

  // Auto-conversation logic
  const generateAutoMessage = useCallback(async () => {
    if (groupParticipants.length === 0) return;

    try {
      setIsTyping(true);
      const participantIds = groupParticipants.map(char => char.id);
      
      const response = await fetch(`/api/group?participants=${participantIds.join(',')}`);
      const data = await response.json();

      if (data.content) {
        // Set typing indicator for the speaking character
        setTypingCharacterId(data.characterId);
        
        // Simulate typing delay
        setTimeout(() => {
          addMessage({
            content: data.content,
            role: 'assistant',
            characterId: data.characterId
          });
          setIsTyping(false);
          setTypingCharacterId(null);
        }, 1000 + Math.random() * 2000); // 1-3 second delay
      }
    } catch (error) {
      console.error('Auto message error:', error);
      setIsTyping(false);
      setTypingCharacterId(null);
    }
  }, [groupParticipants, addMessage, setIsTyping, setTypingCharacterId]);

  // Start/stop auto mode
  useEffect(() => {
    if (isAutoMode && groupParticipants.length > 0) {
      // Generate first message immediately
      generateAutoMessage();
      
      // Set up interval for subsequent messages
      const interval = setInterval(generateAutoMessage, 5000 + Math.random() * 5000); // 5-10 seconds
      setAutoInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (autoInterval) {
        clearInterval(autoInterval);
        setAutoInterval(null);
      }
    }
  }, [isAutoMode, generateAutoMessage, groupParticipants.length, autoInterval]);

  const handleSendMessage = async (message: string) => {
    if (groupParticipants.length === 0) return;

    // Add user message
    addMessage({
      content: message,
      role: 'user'
    });

    try {
      setIsTyping(true);
      
      // Get recent messages for context
      const recentMessages = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...recentMessages, { role: 'user', content: message }],
          participants: groupParticipants.map(char => char.id)
        }),
      });

      const data = await response.json();

      if (data.content) {
        setTypingCharacterId(data.characterId);
        
        // Simulate typing delay
        setTimeout(() => {
          addMessage({
            content: data.content,
            role: 'assistant',
            characterId: data.characterId
          });
          setIsTyping(false);
          setTypingCharacterId(null);
        }, 1000 + Math.random() * 2000);
      }
    } catch (error) {
      console.error('Send message error:', error);
      setIsTyping(false);
      setTypingCharacterId(null);
    }
  };

  const handleNewGroup = () => {
    const newParticipants = getRandomCharacters(5);
    setGroupParticipants(newParticipants);
    clearMessages();
    setIsAutoMode(false);
  };

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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Group Chat Room</h1>
                <p className="text-gray-400 text-sm">
                  {groupParticipants.length} AI personalities chatting
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors md:hidden"
            >
              <Users className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2",
                isAutoMode 
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white" 
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              )}
            >
              {isAutoMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isAutoMode ? 'Stop Auto' : 'Auto Chat'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewGroup}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium transition-all duration-300"
            >
              New Group
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Chat Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Participants Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              variants={slideInFromLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-80 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Participants</h2>
                <span className="text-sm text-gray-400">{groupParticipants.length} members</span>
              </div>

              <div className="space-y-4">
                {groupParticipants.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300",
                      typingCharacterId === character.id && "bg-white/10 border-white/20"
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <CharacterCard 
                        character={character} 
                        size="sm" 
                        showDetails={false}
                      />
                      <div>
                        <h3 className="text-white font-medium">{character.name}</h3>
                        <p className="text-gray-400 text-xs">{character.age} years old</p>
                      </div>
                      {typingCharacterId === character.id && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 rounded-full bg-green-400"
                        />
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      {character.background.slice(0, 80)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {character.personality.slice(0, 2).map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 text-xs rounded bg-white/10 text-gray-300"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Auto Mode Info */}
              {isAutoMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Auto Mode Active</span>
                  </div>
                  <p className="text-gray-300 text-xs">
                    AI characters are chatting automatically. Join the conversation anytime!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex-1 flex flex-col"
        >
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            groupParticipants={groupParticipants}
            isTyping={isTyping}
            typingCharacterId={typingCharacterId || undefined}
            disabled={isTyping}
          />
        </motion.div>
      </div>
    </div>
  );
}