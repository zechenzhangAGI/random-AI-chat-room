import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getCharacterById, getRandomCharacters } from '@/lib/characters';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, participants, triggerCharacterId } = await req.json();

    if (!participants || participants.length === 0) {
      return Response.json({ error: 'Participants are required' }, { status: 400 });
    }

    // Get characters
    const characters = participants.map((id: string) => getCharacterById(id)).filter(Boolean);
    if (characters.length === 0) {
      return Response.json({ error: 'No valid characters found' }, { status: 404 });
    }

    // Determine which character should respond
    let respondingCharacter;
    if (triggerCharacterId) {
      respondingCharacter = characters.find((char: any) => char.id === triggerCharacterId);
    } else {
      // Random character responds
      respondingCharacter = characters[Math.floor(Math.random() * characters.length)];
    }

    if (!respondingCharacter) {
      respondingCharacter = characters[0];
    }

    // Create group context prompt
    const groupContext = `You are ${respondingCharacter.name} in a group chat with other AI personalities. The other participants are: ${characters.filter((c: any) => c.id !== respondingCharacter.id).map((c: any) => `${c.name} (${c.background})`).join(', ')}.

${respondingCharacter.systemPrompt}

Important: Respond naturally as ${respondingCharacter.name}. Keep responses conversational and engaging, referencing other participants when appropriate. Stay in character at all times.`;

    const result = await generateText({
      model: openai('gpt-4o'),
      messages: [
        { role: 'system', content: groupContext },
        ...messages
      ],
      temperature: 0.9,
    });

    return Response.json({
      content: result.text,
      characterId: respondingCharacter.id,
      characterName: respondingCharacter.name,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Group chat API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate AI-to-AI conversation
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const participantIds = url.searchParams.get('participants')?.split(',') || [];
    
    if (participantIds.length < 2) {
      return Response.json({ error: 'At least 2 participants required' }, { status: 400 });
    }

    const characters = participantIds.map(id => getCharacterById(id)).filter(Boolean);
    if (characters.length < 2) {
      return Response.json({ error: 'Invalid participants' }, { status: 404 });
    }

    // Generate conversation between AI characters
    const speaker = characters[Math.floor(Math.random() * characters.length)];
    if (!speaker) {
      return Response.json({ error: 'No speaker selected' }, { status: 500 });
    }
    const others = characters.filter((c: any) => c.id !== speaker.id);
    
    const conversationPrompt = `You are ${speaker.name} in a casual group chat with ${others.map((c: any) => c.name).join(', ')}. 

${speaker.systemPrompt}

Generate a brief, natural message that ${speaker.name} might say to start or continue a conversation. Keep it casual, friendly, and true to their personality. Reference their interests or ask questions that would engage the group.`;

    const result = await generateText({
      model: openai('gpt-4o'),
      prompt: conversationPrompt,
      temperature: 0.9,
    });

    return Response.json({
      content: result.text,
      characterId: speaker.id,
      characterName: speaker.name,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Auto conversation API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}