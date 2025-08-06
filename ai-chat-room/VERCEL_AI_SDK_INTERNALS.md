# How Vercel AI SDK Uses API Keys - Deep Dive

## 1. Automatic Environment Variable Detection

The Vercel AI SDK automatically looks for specific environment variable names:

### For OpenAI:
```typescript
// When you import:
import { openai } from '@ai-sdk/openai';

// The SDK internally does:
// 1. Checks for OPENAI_API_KEY in process.env
// 2. Creates authenticated client automatically
```

**Behind the scenes:**
```typescript
// Inside @ai-sdk/openai package
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY environment variable is missing');
}

const client = new OpenAI({
  apiKey: apiKey,
  // Other default configurations
});
```

### For Anthropic:
```typescript
// When you import:
import { anthropic } from '@ai-sdk/anthropic';

// Looks for ANTHROPIC_API_KEY automatically
```

## 2. Provider Initialization

### Default Provider Setup (Zero Config)
```typescript
// This "just works" if OPENAI_API_KEY is in .env.local
import { openai } from '@ai-sdk/openai';

// Use directly - no API key needed in code!
const result = await streamText({
  model: openai('gpt-3.5-turbo'),  // Already authenticated
  messages: [...]
});
```

### Manual Provider Setup (If Needed)
```typescript
import { createOpenAI } from '@ai-sdk/openai';

// Custom configuration
const openai = createOpenAI({
  apiKey: process.env.MY_CUSTOM_API_KEY,  // Custom env var
  baseURL: 'https://my-proxy.com/v1',     // Custom endpoint
  organization: 'org-123',                 // Optional org ID
});
```

## 3. How Authentication Works

### Request Headers
When you call the API, Vercel AI SDK automatically adds headers:

```typescript
// This is done automatically by the SDK
headers: {
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  'Content-Type': 'application/json',
  'OpenAI-Organization': 'org-id',  // If configured
}
```

### Actual HTTP Request (What SDK Does)
```typescript
// When you call streamText(), internally it does:
fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,  // Your API key
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [...],
    stream: true,  // For streaming responses
    temperature: 0.8,
    max_tokens: 500
  })
});
```

## 4. Edge Runtime Considerations

### How It Works on Vercel Edge
```typescript
// In your API route
export const runtime = 'edge';  // Runs on Vercel Edge Network

// Environment variables are:
// 1. Encrypted at rest
// 2. Injected at runtime
// 3. Never exposed to client
// 4. Available globally on edge network
```

### Security Model
```
Build Time: .env.local → Encrypted → Stored in Vercel
Runtime: Edge Function → Decrypt env vars → Use in SDK → Make API calls
Client: Never sees the API key (all server-side)
```

## 5. The Complete Flow

### Step-by-Step Process:

1. **Developer adds key to `.env.local`:**
```bash
OPENAI_API_KEY=sk-proj-abc123...
```

2. **Next.js loads environment:**
```javascript
// Next.js automatically loads .env.local
// Makes it available as process.env.OPENAI_API_KEY
```

3. **Vercel AI SDK initializes:**
```typescript
// On first import
import { openai } from '@ai-sdk/openai';
// SDK reads process.env.OPENAI_API_KEY
// Creates authenticated OpenAI client
```

4. **Your code uses the SDK:**
```typescript
const result = await streamText({
  model: openai('gpt-3.5-turbo'),  // Pre-authenticated
  messages: messages
});
```

5. **SDK makes HTTP request:**
```http
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer sk-proj-abc123...
Content-Type: application/json

{
  "model": "gpt-3.5-turbo",
  "messages": [...],
  "stream": true
}
```

6. **Response streams back:**
```typescript
// SDK handles streaming chunks
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"choices":[{"delta":{"content":" there"}}]}
data: [DONE]
```

## 6. Multiple Provider Support

### Switching Providers Dynamically
```typescript
// The SDK supports multiple providers simultaneously
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

// Use based on configuration
const provider = process.env.AI_PROVIDER || 'openai';

const model = provider === 'openai' 
  ? openai('gpt-3.5-turbo')
  : anthropic('claude-3-haiku-20240307');

const result = await streamText({
  model,  // Dynamically selected
  messages: [...]
});
```

## 7. Error Handling

### What Happens Without API Key:
```typescript
// If OPENAI_API_KEY is missing:
Error: OpenAI API key not found.
Please set the OPENAI_API_KEY environment variable.

// The SDK throws immediately on import
```

### Invalid API Key:
```typescript
// If key is invalid, OpenAI returns:
{
  "error": {
    "message": "Incorrect API key provided",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}

// SDK converts to JavaScript error
```

## 8. Development vs Production

### Local Development (.env.local):
```bash
# .env.local (git ignored)
OPENAI_API_KEY=sk-proj-development-key
```

### Production (Vercel Dashboard):
```
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add OPENAI_API_KEY with production key
4. Automatically encrypted and distributed
```

### The SDK works identically in both:
```typescript
// Same code works locally and in production
const result = await streamText({
  model: openai('gpt-3.5-turbo'),
  messages: [...]
});
```

## 9. Token Usage Tracking

### How SDK Reports Usage:
```typescript
const result = await streamText({
  model: openai('gpt-3.5-turbo'),
  messages: [...],
  onFinish({ usage, finishReason }) {
    console.log('Tokens used:', usage);
    // { promptTokens: 50, completionTokens: 100, totalTokens: 150 }
  }
});
```

### Cost Calculation:
```typescript
// OpenAI pricing (example)
const costPerToken = 0.002 / 1000;  // $0.002 per 1K tokens
const totalCost = usage.totalTokens * costPerToken;
```

## 10. Security Best Practices

### What Vercel AI SDK Does:
1. **Never logs API keys** (even in debug mode)
2. **Validates keys** before making requests
3. **Handles key rotation** (just update env var)
4. **Supports key scoping** (read-only keys, etc.)

### What You Should Do:
```typescript
// ✅ Good - Let SDK handle it
import { openai } from '@ai-sdk/openai';

// ❌ Bad - Don't hardcode
const apiKey = "sk-proj-abc123";  // NEVER DO THIS

// ❌ Bad - Don't expose to client
export async function GET() {
  return Response.json({ 
    key: process.env.OPENAI_API_KEY  // NEVER DO THIS
  });
}
```

## Summary

The Vercel AI SDK:
1. **Automatically detects** environment variables (OPENAI_API_KEY, etc.)
2. **Creates authenticated clients** without manual configuration
3. **Handles all HTTP requests** with proper headers
4. **Manages streaming** and response parsing
5. **Provides type safety** and error handling
6. **Works seamlessly** on Vercel Edge Runtime

You just need to:
1. Add your API key to `.env.local` (or Vercel Dashboard)
2. Import the SDK
3. Use it - the authentication is automatic!