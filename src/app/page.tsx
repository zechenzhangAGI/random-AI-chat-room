'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Heart, ArrowRight, Sparkles, Bot } from 'lucide-react';
import Link from 'next/link';
import { CharacterCard } from '@/components/CharacterCard';
import { CharacterProfile } from '@/components/CharacterProfile';
import { Character, characters, getRandomCharacters } from '@/lib/characters';
import { fadeInUp, fadeIn, scaleIn } from '@/lib/utils';

export default function Home() {
  // Use static characters for SSR, then randomize on client
  const [featuredCharacters, setFeaturedCharacters] = useState<Character[]>(characters.slice(0, 6));
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Randomize characters after hydration
  useEffect(() => {
    setFeaturedCharacters(getRandomCharacters(6));
  }, []);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-60 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6"
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AI Strangers</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-gray-300">Talk to strangers, but they're all AI</span>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <main className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Hero content */}
            <div className="text-center mb-20">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient text-shadow-lg">
                  Meet AI
                  <br />
                  <span className="text-5xl md:text-7xl">Strangers</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Random conversations with AI strangers. Skip if boring, stay if interesting. 
                  Every chat is a surprise - like Omegle, but with fascinating AI personalities.
                </p>
              </motion.div>

              {/* Floating Characters */}
              <motion.div 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5, duration: 1 }}
                className="flex justify-center items-center space-x-4 mb-12 flex-wrap gap-4"
              >
                {featuredCharacters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7 + index * 0.1, 
                      duration: 0.5, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className={`animate-float ${index % 2 === 0 ? 'animate-float-delayed' : ''}`}
                  >
                    <CharacterCard 
                      character={character} 
                      size="lg"
                      className="neon-glow hover:neon-glow-pink transition-all duration-300 cursor-pointer"
                      onClick={() => handleCharacterClick(character)}
                      showDetails={false}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link href="/chat">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,255,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2 min-w-[220px]"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Talk to Stranger</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link href="/group">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236,72,153,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 flex items-center space-x-2 min-w-[220px]"
                  >
                    <Users className="w-6 h-6" />
                    <span>Join Group Room</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Features Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.5, duration: 0.8 }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Random Encounters",
                  description: "Every chat is a surprise. Meet someone new with each connection - just like talking to real strangers.",
                  gradient: "from-yellow-400 to-orange-500"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Skip Anytime",
                  description: "Boring conversation? Hit 'Next' instantly. Find someone interesting to talk to - no awkward goodbyes.",
                  gradient: "from-cyan-400 to-blue-500"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Deep Conversations",
                  description: "These aren't bots - they're personalities with stories, dreams, and genuine curiosity about you.",
                  gradient: "from-pink-400 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.2, duration: 0.6 }}
                  className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:neon-glow transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Character Showcase */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-24 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Who You Might Meet
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Every stranger has a story - from astronomers to artists, comedians to philosophers. 
                You never know who you'll connect with next.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                {characters.slice(0, 12).map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.8 + index * 0.1, duration: 0.4 }}
                  >
                    <CharacterCard 
                      character={character} 
                      size="md"
                      showDetails={false}
                      className="hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleCharacterClick(character)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="border-t border-gray-800 mt-24 py-8"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400">
              Built with Next.js, Vercel AI SDK, and powered by advanced language models
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Character Profile Modal */}
      <CharacterProfile 
        character={selectedCharacter}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
