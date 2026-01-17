# 🚀 Quick Deployment Guide

## ✅ Pre-Deployment Status
- ✅ Build successful
- ✅ Vercel CLI installed
- ✅ Project ready for deployment

## 🎯 Quick Deploy Steps

### Step 1: Login to Vercel
```bash
cd /home/sarva/darshan_project/my-portfolio
vercel login
```
This will open your browser to login. Follow the prompts.

### Step 2: Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → `Yes` (or `y`)
- **Which scope?** → Choose your account
- **Link to existing project?** → `No` (first time)
- **Project name?** → Press Enter for `my-portfolio` or enter custom name
- **Directory?** → Press Enter (current directory)
- **Override settings?** → `No` (or `n`)

### Step 3: Add Environment Variable
After deployment, **IMPORTANT**: Add your OpenAI API key:

1. Go to https://vercel.com/dashboard
2. Select your project (`my-portfolio`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `your_openai_api_key_here`
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy**: Go to **Deployments** tab → Click "..." on latest → **Redeploy**

### Step 4: Test Your Deployment
Visit your deployment URL (shown after `vercel` command completes).

Example: `https://my-portfolio-xyz.vercel.app`

## 🔑 Important Notes

1. **Environment Variables**: Without `OPENAI_API_KEY`, AI chatbots won't work
2. **Custom Domain**: After deployment, you can add a custom domain in Vercel Settings
3. **Auto-Deploy**: If you push to GitHub, Vercel will auto-deploy (if connected)

## 📋 Alternative: Deploy via GitHub

1. Initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create GitHub repo and push

3. Go to https://vercel.com/new and import from GitHub

## ✨ You're Done!

Your portfolio will be live at: `https://your-project-name.vercel.app`
