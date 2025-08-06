# AI API Implementation Guide

## Overview
This document explains how the AI API keys are used and the logic behind the chat system.

## 1. API Key Setup

### Environment Variables
The app uses environment variables to securely store API keys:

```bash
# .env.local
OPENAI_API_KEY=sk-your-openai-api-key-here
# Or use Anthropic
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

### How the API Key is Used
The Vercel AI SDK automatically reads these environment variables when initializing the AI providers:

```typescript
// In API routes
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
```

## 2. Core Chat Logic Flow

### 1-on-1 Chat (`/api/chat/route.ts`)

```
User sends message → API receives request → Character system prompt injected → 
AI generates response → Stream response back to user
```

**Detailed Flow:**

1. **User sends a message** from the chat interface
2. **API receives** the message along with:
   - `characterId`: Which AI character is active
   - `messages`: Chat history for context

3. **Character personality is injected**:
   ```typescript
   const character = getCharacterById(characterId);
   const systemMessage = {
     role: 'system',
     content: character.systemPrompt  // Character's personality prompt
   };
   ```

4. **AI generates response** using Vercel AI SDK:
   ```typescript
   const result = await streamText({
     model: openai('gpt-3.5-turbo'),
     messages: [systemMessage, ...messages],
     temperature: 0.8,  // Controls randomness (0-1)
     maxTokens: 500,    // Limits response length
   });
   ```

5. **Response is streamed** back to the user in real-time

### Group Chat (`/api/group/route.ts`)

```
User/AI messages → Determine responding character → 
Add group context → Generate character-specific response
```

**Key Features:**
- Multiple AI characters in one room
- Characters respond based on their personalities
- AI-to-AI conversations possible

## 3. Character System

### Character Structure
Each character has:
```typescript
{
  id: "luna",
  name: "Luna",
  age: 24,
  background: "Astronomy graduate student...",
  personality: ["dreamy", "philosophical", "curious"],
  interests: ["astronomy", "poetry", "night photography"],
  systemPrompt: "You are Luna, a 24-year-old astronomy student..."
}
```

### System Prompt Strategy
The `systemPrompt` is the core of each character's personality:

```typescript
systemPrompt: `You are ${name}, a ${age}-year-old ${profession}.
${personality traits}
${speaking style}
${interests and knowledge}
Instructions:
- Be proactive and ask questions
- Stay in character
- Share personal anecdotes
- Express emotions naturally`
```

## 4. Frontend Integration

### Using Vercel AI SDK's `useChat` Hook
```typescript
// In chat component
import { useChat } from 'ai/react';

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
  body: {
    characterId: currentCharacter.id
  }
});
```

### Manual API Calls (Current Implementation)
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    messages: chatHistory,
    characterId: currentCharacter.id
  })
});

// Handle streaming response
const reader = response.body?.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  // Process chunks...
}
```

## 5. Key Technical Decisions

### Why Streaming?
- **Better UX**: Users see responses as they're generated
- **Lower latency**: First tokens appear quickly
- **Natural feel**: Mimics human typing

### Temperature Settings
- **0.8 for 1-on-1**: Balanced creativity
- **0.9 for group**: More varied responses
- **Why?**: Higher temperature = more creative/random

### Token Limits
- **500 for 1-on-1**: Detailed responses
- **300 for group**: Shorter, punchier messages
- **150 for auto-chat**: Quick exchanges

### Edge Runtime
```typescript
export const runtime = 'edge';
```
- Faster response times
- Better scalability
- Lower costs on Vercel

## 6. Character Switching Logic

### Skip/Next Button
```typescript
const handleSkipCharacter = () => {
  // Get all character IDs except current
  const excludeIds = [currentCharacter.id];
  
  // Get random new character
  const newCharacter = getRandomCharacter(excludeIds);
  
  // Clear chat history
  clearMessages();
  
  // Set new character
  setCurrentCharacter(newCharacter);
};
```

### Maintaining Character Context
- Each character has isolated message history
- Switching characters doesn't lose previous conversations
- Can return to previous characters later

## 7. Group Chat AI-to-AI Logic

### Auto-conversation Generation
```typescript
// GET /api/group - generates AI-to-AI messages
const speaker = characters[Math.floor(Math.random() * characters.length)];

const conversationPrompt = `You are ${speaker.name} in a chat with ${others}.
Generate a natural message that ${speaker.name} might say...`;

const result = await generateText({
  model: openai('gpt-3.5-turbo'),
  prompt: conversationPrompt,
  temperature: 0.9
});
```

### Triggering Responses
1. **User message**: All AIs can respond
2. **Auto mode**: AIs talk to each other
3. **Specific trigger**: Target one character to respond

## 8. Error Handling

### API Failures
```typescript
try {
  const response = await fetch('/api/chat', {...});
  if (!response.ok) throw new Error('API failed');
} catch (error) {
  // Show fallback message
  addMessage({
    content: "Sorry, I'm having connection issues...",
    role: 'assistant'
  });
}
```

### Rate Limiting Strategy
- Cache character responses
- Implement request queuing
- Show typing indicators during delays

## 9. Cost Optimization

### Strategies Used:
1. **Model Selection**: GPT-3.5-turbo (cheaper than GPT-4)
2. **Token Limits**: Capped responses
3. **Context Window**: Only last 5 messages sent
4. **Edge Functions**: Reduced compute costs
5. **Caching**: Character data cached client-side

### Estimated Costs:
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- Average conversation: ~2K tokens
- Cost per chat: ~$0.004

## 10. Future Enhancements

### Planned Features:
1. **Memory System**: Characters remember past conversations
2. **Emotion States**: Dynamic mood changes
3. **Voice Integration**: Text-to-speech for characters
4. **Custom Characters**: User-created personalities
5. **Relationship System**: Characters reference each other

### Alternative AI Providers:
```typescript
// Easy to switch providers
import { anthropic } from '@ai-sdk/anthropic';
const result = await streamText({
  model: anthropic('claude-3-haiku'),
  // ... same config
});
```

## Summary

The system uses:
1. **Vercel AI SDK** for seamless AI integration
2. **Character system prompts** for personality
3. **Streaming responses** for better UX
4. **Edge runtime** for performance
5. **Smart context management** for coherent conversations

This architecture ensures scalable, engaging AI conversations while maintaining character consistency and managing costs effectively.