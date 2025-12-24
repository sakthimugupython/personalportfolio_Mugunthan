# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to https://vercel.com
2. Sign up or log in with GitHub
3. Click "Add New..." → "Project"
4. Select your portfolio repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"
7. Your site is live!

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts to deploy.

## Configuration

The `vercel.json` file handles:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Framework**: Vite
- **Rewrites**: All routes redirect to `index.html` (SPA routing)
- **Caching**: Optimized cache headers for assets and data

## Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records at your registrar
4. Vercel provides free SSL certificate

## Environment Variables (if needed)

1. Go to Settings → Environment Variables
2. Add any variables needed
3. Redeploy for changes to take effect

## Auto-Deploy

Every push to your GitHub repository automatically triggers a new deployment. No manual steps needed!

## Monitoring

- View deployment logs in Vercel dashboard
- Check performance metrics and analytics
- Monitor build times and errors

## Troubleshooting

**Images not showing:**
- Ensure files are in `public/` folder
- Check that paths in JSON files are correct (e.g., `/Project1.jpeg`)
- Clear browser cache

**Build fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

**Slow performance:**
- Use Vercel Analytics to identify bottlenecks
- Optimize images (use WebP format)
- Enable Vercel's automatic image optimization

## Rollback

If deployment has issues:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Redeploy"

---

Your portfolio is now deployed on Vercel! 🚀
