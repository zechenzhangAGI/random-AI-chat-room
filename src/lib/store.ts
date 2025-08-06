import { create } from 'zustand';
import { Character } from './characters';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  characterId?: string;
  timestamp: Date;
  roomType?: 'chat' | 'group'; // Track which room the message belongs to
}

export interface ChatState {
  // Current character for 1-on-1 chat
  currentCharacter: Character | null;
  setCurrentCharacter: (character: Character | null) => void;
  
  // Group chat participants
  groupParticipants: Character[];
  setGroupParticipants: (characters: Character[]) => void;
  
  // Separate chat histories
  singleChatMessages: Message[];
  groupChatMessages: Message[];
  addSingleChatMessage: (message: Omit<Message, 'id' | 'timestamp' | 'roomType'>) => void;
  addGroupChatMessage: (message: Omit<Message, 'id' | 'timestamp' | 'roomType'>) => void;
  clearSingleChatMessages: () => void;
  clearGroupChatMessages: () => void;
  
  // UI state
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  typingCharacterId: string | null;
  setTypingCharacterId: (characterId: string | null) => void;
  
  // Chat room state
  currentRoom: 'lobby' | 'chat' | 'group';
  setCurrentRoom: (room: 'lobby' | 'chat' | 'group') => void;
  
  // Mobile sidebar state
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  // Character state
  currentCharacter: null,
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
  
  // Group chat state
  groupParticipants: [],
  setGroupParticipants: (characters) => set({ groupParticipants: characters }),
  
  // Separate message states for single and group chats
  singleChatMessages: [],
  groupChatMessages: [],
  addSingleChatMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      roomType: 'chat',
    };
    set({ singleChatMessages: [...get().singleChatMessages, newMessage] });
  },
  addGroupChatMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      roomType: 'group',
    };
    set({ groupChatMessages: [...get().groupChatMessages, newMessage] });
  },
  clearSingleChatMessages: () => set({ singleChatMessages: [] }),
  clearGroupChatMessages: () => set({ groupChatMessages: [] }),
  
  // UI state
  isTyping: false,
  setIsTyping: (typing) => set({ isTyping: typing }),
  typingCharacterId: null,
  setTypingCharacterId: (characterId) => set({ typingCharacterId: characterId }),
  
  // Room state
  currentRoom: 'lobby',
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  // Sidebar state
  isSidebarOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));