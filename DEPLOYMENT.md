# Vercel Deployment Guide

## ✅ Build Status
- Build completed successfully ✓
- All pages generated ✓
- No errors detected ✓

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /home/sarva/darshan_project/my-portfolio
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Choose your account)
   - Link to existing project? **No** (for first deployment)
   - Project name? (Default: `my-portfolio` or choose custom)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

4. **Add Environment Variable**:
   After deployment, add your OpenAI API key:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your_openai_api_key_here`
   - Redeploy if needed

### Option 2: Deploy via GitHub + Vercel (Recommended for continuous deployment)

1. **Initialize Git Repository** (if not already done):
   ```bash
   cd /home/sarva/darshan_project/my-portfolio
   git init
   git add .
   git commit -m "Initial commit: Portfolio with AI features"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `my-portfolio`)
   - Don't initialize with README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy via Vercel Dashboard**:
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework Preset: **Next.js** (auto-detected)
     - Root Directory: `./` (default)
     - Build Command: `npm run build` (default)
     - Output Directory: `.next` (default)
   - Add Environment Variable: `OPENAI_API_KEY`
   - Click "Deploy"

### Option 3: Deploy via Vercel Dashboard (Manual Upload)

1. **Create .vercelignore** (optional - to exclude files):
   ```
   node_modules
   .next
   .git
   .env.local
   ```

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/new
   - Drag and drop your project folder OR use CLI

## 🔑 Environment Variables

**IMPORTANT**: You must add your OpenAI API key in Vercel:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `your_openai_api_key_here`
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"
5. Redeploy if needed

## 📋 Pre-Deployment Checklist

- ✅ Build successful (`npm run build`)
- ✅ All pages load correctly
- ✅ Images in `/public/images/`
- ✅ `.env.local` excluded from git
- ✅ OpenAI API key ready for Vercel

## 🌐 Post-Deployment

After deployment, you'll get a URL like: `https://my-portfolio.vercel.app`

### Next Steps:
1. Test all pages on the deployed site
2. Test AI chatbots (make sure API key is set)
3. Customize domain (optional) in Vercel Settings → Domains
4. Enable Analytics (optional) in Vercel Dashboard

## 🔧 Troubleshooting

- **Build fails**: Check `npm run build` locally first
- **API routes fail**: Verify `OPENAI_API_KEY` environment variable is set
- **Images not loading**: Check `/public/images/` folder is included
- **Type errors**: Run `npm run lint` to check

## 📞 Support

For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
