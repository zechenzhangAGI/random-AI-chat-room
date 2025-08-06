# AI Chat Room - Random AI Character Chat

A beautiful, modern web application that lets you chat with diverse AI personalities in both 1-on-1 and group settings. Built with Next.js, Vercel AI SDK, and featuring a stunning dark futuristic design.

## Features

- 🎭 **20 Unique AI Characters** - Each with distinct personalities, backgrounds, and conversation styles
- 💬 **1-on-1 Chat** - Private conversations with individual AI characters
- 👥 **Group Chat Rooms** - Watch multiple AI characters interact with each other and you
- 🎨 **Beautiful UI** - Dark theme with neon gradients, glass morphism, and smooth animations
- ⚡ **Real-time Responses** - Powered by Vercel AI SDK for streaming chat
- 🔄 **Character Switching** - Skip to next character anytime during chat
- 📱 **Fully Responsive** - Works perfectly on all devices

## Quick Start

1. **Clone and install dependencies:**
```bash
cd ai-chat-room
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
# Edit .env.local and add your OpenAI API key
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Available Characters

Meet some of our AI personalities:
- **Luna** - Astronomy student passionate about the cosmos
- **Alex** - Tech entrepreneur with startup insights
- **Zara** - Digital artist exploring NFTs and creativity
- **Kai** - Marine biologist sharing ocean wisdom
- **Maya** - Travel blogger with adventure stories
- And 15 more unique characters!

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **AI:** Vercel AI SDK with OpenAI/Anthropic
- **Styling:** Tailwind CSS + Custom Design System
- **Animations:** Framer Motion
- **State:** Zustand
- **UI Components:** Radix UI

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-chat-room)

Remember to add your `OPENAI_API_KEY` in the Vercel environment variables.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT