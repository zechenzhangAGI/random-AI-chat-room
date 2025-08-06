import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getCharacterById } from '@/lib/characters';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, characterId } = await req.json();

    if (!characterId) {
      return NextResponse.json({ error: 'Character ID is required' }, { status: 400 });
    }

    const character = getCharacterById(characterId);
    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // For now, use generateText (non-streaming) to verify the API key works
    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        { role: 'system', content: character.systemPrompt },
        ...messages
      ],
      temperature: 0.8,
      maxTokens: 500,
    });

    return NextResponse.json({ 
      content: result.text,
      characterId: character.id 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}