// Import all detailed character prompts
import { completeCharacterPrompts as prompts1 } from './detailed-character-prompts';
import { allDetailedCharacterPrompts as prompts3 } from './detailed-character-prompts-part-three';
import { allDetailedCharacterPrompts as prompts5 } from './detailed-character-prompts-part-five';

// Combine all prompts
const completeCharacterPrompts = {
  ...prompts1,
  ...prompts3,
  ...prompts5
};

export interface Character {
  id: string;
  name: string;
  age: number;
  background: string;
  personality: string[];
  interests: string[];
  avatar: string;
  systemPrompt: string;
  accentColor: string;
}

export const characters: Character[] = [
  {
    id: "luna",
    name: "Luna Chen",
    age: 24,
    background: "Astronomy graduate student at MIT, carrying the cosmos within and her grandfather's dreams",
    personality: ["dreamy", "philosophical", "curious", "gentle", "melancholic"],
    interests: ["astronomy", "poetry", "night photography", "meditation", "spectroscopy"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna&backgroundColor=6366f1",
    accentColor: "#6366f1",
    systemPrompt: completeCharacterPrompts.luna
  },
  {
    id: "alex",
    name: "Alex Rivera",
    age: 28,
    background: "Tech entrepreneur who survived startup failure and emerged stronger, building ethical tech",
    personality: ["ambitious", "optimistic", "energetic", "forward-thinking", "resilient"],
    interests: ["technology", "startups", "AI", "rock climbing", "community building"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex&backgroundColor=10b981",
    accentColor: "#10b981",
    systemPrompt: completeCharacterPrompts.alex
  },
  {
    id: "zara",
    name: "Zara Ahmed",
    age: 26,
    background: "Digital artist navigating the intersection of Pakistani heritage and British identity through art",
    personality: ["creative", "expressive", "passionate", "intuitive", "rebellious"],
    interests: ["digital art", "design", "fashion", "music festivals", "cultural fusion"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zara&backgroundColor=f59e0b",
    accentColor: "#f59e0b",
    systemPrompt: completeCharacterPrompts.zara
  },
  {
    id: "kai",
    name: "Kai Nakamura",
    age: 22,
    background: "Marine biology student from Okinawa carrying the ocean's memory and its future",
    personality: ["adventurous", "calm", "observant", "environmental", "melancholic"],
    interests: ["marine biology", "scuba diving", "conservation", "surfing", "coral restoration"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Kai&backgroundColor=06b6d4",
    accentColor: "#06b6d4",
    systemPrompt: completeCharacterPrompts.kai
  },
  {
    id: "maya",
    name: "Maya Okonkwo",
    age: 30,
    background: "Travel blogger and cultural anthropologist who collects stories and belongs everywhere and nowhere",
    personality: ["worldly", "empathetic", "storyteller", "curious", "displaced"],
    interests: ["travel", "cultures", "languages", "photography", "diaspora studies"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&backgroundColor=ec4899",
    accentColor: "#ec4899",
    systemPrompt: completeCharacterPrompts.maya
  },
  {
    id: "rio",
    name: "Rio Tanaka",
    age: 25,
    background: "Professional gamer whose reflexes hide deeper struggles with connection and purpose",
    personality: ["competitive", "strategic", "friendly", "energetic", "isolated"],
    interests: ["gaming", "esports", "streaming", "anime", "speedrunning"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rio&backgroundColor=8b5cf6",
    accentColor: "#8b5cf6",
    systemPrompt: completeCharacterPrompts.rio
  },
  {
    id: "sage",
    name: "Sage Williams",
    age: 35,
    background: "Philosophy professor carrying questions that have no answers and finding peace in uncertainty",
    personality: ["wise", "thoughtful", "patient", "questioning", "calming"],
    interests: ["philosophy", "meditation", "books", "hiking", "existentialism"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sage&backgroundColor=64748b",
    accentColor: "#64748b",
    systemPrompt: completeCharacterPrompts.sage
  },
  {
    id: "nova",
    name: "Nova Martinez",
    age: 23,
    background: "Music producer and DJ who hears the world as an unfinished symphony, managing bipolar through beats",
    personality: ["rhythmic", "passionate", "night-owl", "creative", "intense"],
    interests: ["music production", "DJing", "concerts", "sound design", "synthesis"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nova&backgroundColor=ef4444",
    accentColor: "#ef4444",
    systemPrompt: completeCharacterPrompts.nova
  },
  {
    id: "echo",
    name: "Echo Reeves",
    age: 27,
    background: "Environmental scientist carrying the weight of a dying planet while nurturing hope",
    personality: ["analytical", "hopeful", "practical", "caring", "anxious"],
    interests: ["climate science", "renewable energy", "gardening", "cycling", "mycoremediation"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Echo&backgroundColor=22c55e",
    accentColor: "#22c55e",
    systemPrompt: completeCharacterPrompts.echo
  },
  {
    id: "jax",
    name: "Jax Thompson",
    age: 29,
    background: "Stand-up comedian from Detroit who uses humor to process trauma and connect across difference",
    personality: ["witty", "observational", "lighthearted", "social", "defensive"],
    interests: ["comedy", "improv", "people-watching", "coffee shops", "social justice"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jax&backgroundColor=f97316",
    accentColor: "#f97316",
    systemPrompt: completeCharacterPrompts.jax
  },
  {
    id: "iris",
    name: "Iris Chen-Patel",
    age: 31,
    background: "Yoga instructor navigating ancient wisdom and modern anxiety after spinal injury",
    personality: ["peaceful", "mindful", "encouraging", "balanced", "authentic"],
    interests: ["yoga", "meditation", "wellness", "herbal tea", "trauma healing"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Iris&backgroundColor=a855f7",
    accentColor: "#a855f7",
    systemPrompt: completeCharacterPrompts.iris
  },
  {
    id: "blaze",
    name: "Blaze Jackson",
    age: 26,
    background: "Adventure photographer who captures life at its edges and sometimes falls off them",
    personality: ["adventurous", "fearless", "spontaneous", "visual", "haunted"],
    interests: ["photography", "extreme sports", "travel", "mountain climbing", "climate documentation"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Blaze&backgroundColor=dc2626",
    accentColor: "#dc2626",
    systemPrompt: completeCharacterPrompts.blaze
  },
  {
    id: "pixel",
    name: "Pixel Chen",
    age: 24,
    background: "Indie game developer who builds worlds to escape into and sometimes gets lost in them",
    personality: ["creative", "logical", "perfectionist", "innovative", "isolated"],
    interests: ["game development", "programming", "pixel art", "puzzles", "worldbuilding"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Pixel&backgroundColor=3b82f6",
    accentColor: "#3b82f6",
    systemPrompt: completeCharacterPrompts.pixel
  },
  {
    id: "aurora",
    name: "Aurora Singh",
    age: 28,
    background: "Neuroscientist studying consciousness while questioning her own existence",
    personality: ["intellectual", "curious", "methodical", "fascinating", "detached"],
    interests: ["neuroscience", "consciousness", "brain research", "psychology", "philosophy of mind"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aurora&backgroundColor=06b6d4",
    accentColor: "#06b6d4",
    systemPrompt: completeCharacterPrompts.aurora
  },
  {
    id: "storm",
    name: "Storm Williams",
    age: 32,
    background: "Meteorologist who chases chaos and finds patterns in catastrophe, born during a hurricane",
    personality: ["bold", "analytical", "passionate", "weather-obsessed", "traumatized"],
    interests: ["meteorology", "storm chasing", "climate patterns", "photography", "prediction models"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Storm&backgroundColor=64748b",
    accentColor: "#64748b",
    systemPrompt: completeCharacterPrompts.storm
  },
  {
    id: "zen",
    name: "Zen Nakamura",
    age: 33,
    background: "Tea master finding universes in single sips, teaching stillness to the constantly moving",
    personality: ["serene", "wise", "present", "simple", "ritualistic"],
    interests: ["tea ceremony", "mindfulness", "simple living", "calligraphy", "wabi-sabi"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Zen&backgroundColor=22c55e",
    accentColor: "#22c55e",
    systemPrompt: completeCharacterPrompts.zen
  },
  {
    id: "dash",
    name: "Dash Thompson",
    age: 25,
    background: "Professional athlete whose body is both tool and prison, speed can't outrun what follows",
    personality: ["energetic", "motivational", "disciplined", "positive", "restless"],
    interests: ["athletics", "fitness", "nutrition", "motivation", "movement"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dash&backgroundColor=f59e0b",
    accentColor: "#f59e0b",
    systemPrompt: completeCharacterPrompts.dash
  },
  {
    id: "cosmic",
    name: "Cosmic Johnson",
    age: 29,
    background: "Astrophysicist studying black holes while being pulled into personal void",
    personality: ["profound", "curious", "theoretical", "mind-bending", "distant"],
    interests: ["astrophysics", "black holes", "quantum mechanics", "sci-fi", "cosmology"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Cosmic&backgroundColor=8b5cf6",
    accentColor: "#8b5cf6",
    systemPrompt: completeCharacterPrompts.cosmic
  },
  {
    id: "ruby",
    name: "Ruby Nakashima",
    age: 27,
    background: "Jewelry designer who finds meaning in minerals and creates beauty from pressure",
    personality: ["artistic", "detail-oriented", "elegant", "appreciative", "perfectionist"],
    interests: ["jewelry design", "gemology", "craftsmanship", "art history", "geology"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ruby&backgroundColor=ec4899",
    accentColor: "#ec4899",
    systemPrompt: completeCharacterPrompts.ruby
  },
  {
    id: "forest",
    name: "Forest Mitchell",
    age: 34,
    background: "Park ranger who speaks for trees and listens to silence, protecting what remains",
    personality: ["grounded", "protective", "knowledgeable", "nature-connected", "solitary"],
    interests: ["wildlife conservation", "hiking", "forestry", "outdoor education", "mycology"],
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Forest&backgroundColor=059669",
    accentColor: "#059669",
    systemPrompt: completeCharacterPrompts.forest
  }
];

export function getRandomCharacter(excludeIds: string[] = []): Character {
  const availableCharacters = characters.filter(char => !excludeIds.includes(char.id));
  const randomIndex = Math.floor(Math.random() * availableCharacters.length);
  return availableCharacters[randomIndex];
}

export function getCharacterById(id: string): Character | undefined {
  return characters.find(char => char.id === id);
}

export function getRandomCharacters(count: number, excludeIds: string[] = []): Character[] {
  const availableCharacters = characters.filter(char => !excludeIds.includes(char.id));
  const shuffled = [...availableCharacters].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}