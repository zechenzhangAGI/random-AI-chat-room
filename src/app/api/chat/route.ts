import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getCharacterById } from '@/lib/characters';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, characterId } = await req.json();

    if (!characterId) {
      return Response.json({ error: 'Character ID is required' }, { status: 400 });
    }

    const character = getCharacterById(characterId);
    if (!character) {
      return Response.json({ error: 'Character not found' }, { status: 404 });
    }

    // Add character's system prompt
    const systemMessage = {
      role: 'system' as const,
      content: character.systemPrompt
    };

    // Use generateText for simpler implementation
    const result = await generateText({
      model: openai('gpt-4o'),
      messages: [systemMessage, ...messages],
      temperature: 0.8,
    });

    // Return the generated text as JSON
    return Response.json({ 
      content: result.text 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}