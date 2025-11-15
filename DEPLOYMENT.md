# Deployment Guide

## Vercel Deployment Instructions

### Step 1: Connect Repository to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `vaishragh03/my-streaming-dashboard`
4. Vercel will automatically detect Next.js

### Step 2: Configure Environment Variables

**IMPORTANT:** Add these environment variables in Vercel's project settings:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

```
TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
OMDB_API_KEY=a60c7ded
```

**Note:** 
- Use `TMDB_API_KEY` (NOT `NEXT_PUBLIC_TMDB_API_KEY`) because we're using server-side API routes
- The API key is kept secure on the server and never exposed to the client
- Add these for all environments: Production, Preview, and Development

### Step 3: Deploy

1. Click "Deploy" 
2. Vercel will automatically build and deploy your application
3. Once deployed, you'll get a live URL (e.g., `https://your-project.vercel.app`)

### Step 4: Verify Deployment

After deployment, verify:
- ✅ Home page loads with movie rows
- ✅ Search functionality works
- ✅ Movie detail pages load correctly
- ✅ No 401 errors in the browser console

## Troubleshooting

### Issue: 401 Unauthorized Errors

**Solution:** 
- Ensure `TMDB_API_KEY` is set in Vercel environment variables
- Make sure you're using `TMDB_API_KEY` (not `NEXT_PUBLIC_TMDB_API_KEY`)
- Redeploy after adding environment variables

### Issue: API Routes Not Working

**Solution:**
- Check that environment variables are set for the correct environment (Production/Preview/Development)
- Verify the API key is valid by testing it directly with TMDB API
- Check Vercel function logs for errors

### Issue: Build Errors

**Solution:**
- Ensure all dependencies are in `package.json`
- Check that TypeScript types are correct
- Review build logs in Vercel dashboard

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `TMDB_API_KEY` | The Movie Database API key | Yes | `5b815bf91fa942c41e80fda28f9746d2` |
| `OMDB_API_KEY` | Open Movie Database API key | Yes | `a60c7ded` |

## Architecture Changes

This application uses **server-side API routes** to keep API keys secure:

- Client-side code calls `/api/tmdb/*` routes
- API routes fetch from TMDB using server-side environment variables
- API keys are never exposed to the client
- All TMDB requests go through Next.js API routes

## API Routes

The following API routes are available:

- `/api/tmdb/trending` - Get trending content
- `/api/tmdb/netflix-originals` - Get Netflix originals
- `/api/tmdb/top-rated` - Get top rated movies
- `/api/tmdb/genre/[genreId]` - Get movies by genre
- `/api/tmdb/movie/[id]` - Get movie/TV details
- `/api/tmdb/search` - Search movies and TV shows

All routes use the `TMDB_API_KEY` environment variable server-side.

