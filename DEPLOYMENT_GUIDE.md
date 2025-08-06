# Vercel Deployment Guide for AI Chat Room

## Prerequisites
- Vercel account (create one at https://vercel.com/signup)
- OpenAI API key (already in your .env.local)

## Option 1: Deploy via GitHub (Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Click "Import Git Repository"

2. **Connect Your GitHub Repository**
   - Select `zechenzhangAGI/random-AI-chat-room`
   - Click "Import"

3. **Configure Project**
   - **Root Directory**: Leave as default (root)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Build Settings**: Leave as default

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add your OpenAI API key:
     ```
     Name: OPENAI_API_KEY
     Value: [Your OpenAI API key from .env.local]
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

## Option 2: Deploy via CLI

1. **Login to Vercel**
   ```bash
   npx vercel login
   ```

2. **Deploy**
   ```bash
   npx vercel --yes
   ```

3. **Set Environment Variables**
   ```bash
   npx vercel env add OPENAI_API_KEY
   ```
   - Paste your OpenAI API key when prompted
   - Select all environments (Production, Preview, Development)

4. **Deploy to Production**
   ```bash
   npx vercel --prod
   ```

## Option 3: Deploy Button (One-Click)

Add this to your GitHub README for one-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FzechenzhangAGI%2Frandom-AI-chat-room&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key%20for%20GPT-4o)

## Post-Deployment

### Your App URLs
- **Production**: `https://[your-project-name].vercel.app`
- **Preview**: Created for each git branch/PR

### Important Settings

1. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Ensure OPENAI_API_KEY is set for Production

2. **Domain (Optional)**
   - Settings → Domains
   - Add custom domain if desired

3. **Function Region**
   - Settings → Functions
   - Choose region closest to your users (default: US East)

## Troubleshooting

### Build Fails
- Check that root directory is set correctly (should be root)
- Verify Node.js version (18.x or higher)

### API Not Working
- Verify OPENAI_API_KEY is set in environment variables
- Check OpenAI API key has credits/is active
- Look at Function Logs in Vercel dashboard

### 500 Errors
- Check Vercel Function Logs
- Ensure API routes are using Edge Runtime correctly
- Verify all dependencies are installed

## Monitor Your App

1. **Analytics**: Vercel Dashboard → Analytics
2. **Logs**: Vercel Dashboard → Functions → Logs
3. **Speed Insights**: Automatically included

## Update Deployment

After making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically redeploys on push to main branch.

## Estimated Costs

- **Vercel**: Free tier includes:
  - 100GB bandwidth/month
  - 100GB-hours for Serverless Functions
  - Unlimited deployments

- **OpenAI API**: Pay per use
  - GPT-4o: ~$5-15/1M tokens
  - Monitor usage at https://platform.openai.com/usage

## Quick Deploy Checklist

- [ ] GitHub repo is public or connected to Vercel
- [ ] Root directory is correct (leave as default)
- [ ] OPENAI_API_KEY environment variable added
- [ ] Deploy clicked
- [ ] Test chat functionality after deployment