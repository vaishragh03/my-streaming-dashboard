# Deployment Verification Checklist

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Environment variables are set in Vercel:
  - `TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2`
  - `OMDB_API_KEY=a60c7ded`
- [ ] Variables are set for all environments (Production, Preview, Development)
- [ ] Latest code is pushed to GitHub
- [ ] Build passes locally: `npm run build`

## ✅ Post-Deployment Verification

After deployment, verify:

### 1. API Routes Work
Test these URLs (should return JSON, not errors):

- [ ] `https://my-streaming-dashboard-six.vercel.app/api/tmdb/trending`
- [ ] `https://my-streaming-dashboard-six.vercel.app/api/tmdb/netflix-originals`
- [ ] `https://my-streaming-dashboard-six.vercel.app/api/tmdb/top-rated`

**Expected:** JSON response with movie data
**If error:** Environment variables not set correctly

### 2. Homepage Loads
- [ ] `https://my-streaming-dashboard-six.vercel.app/` loads without errors
- [ ] Movie rows appear
- [ ] No "Loading..." stuck state
- [ ] No console errors (F12 → Console)

### 3. Search Works
- [ ] Click search icon
- [ ] Type a movie name
- [ ] Results appear in dropdown
- [ ] Can click result to navigate

### 4. Detail Page Works
- [ ] Click on a movie card
- [ ] Navigate to `/movie/[id]`
- [ ] Movie details page loads
- [ ] Images display correctly

## 🔧 Quick Fixes

### If API Routes Return 500:
1. Check Vercel → Settings → Environment Variables
2. Ensure `TMDB_API_KEY` is set (not `NEXT_PUBLIC_TMDB_API_KEY`)
3. Redeploy

### If Homepage Shows "Loading...":
1. Check browser console (F12) for errors
2. Verify API routes work (test URLs above)
3. Check Vercel function logs

### If Build Fails:
1. Check build logs in Vercel
2. Test locally: `npm run build`
3. Fix any TypeScript errors

## 📊 Health Check URLs

Test these to verify deployment:

```
✅ Homepage: https://my-streaming-dashboard-six.vercel.app/
✅ API - Trending: https://my-streaming-dashboard-six.vercel.app/api/tmdb/trending
✅ API - Netflix Originals: https://my-streaming-dashboard-six.vercel.app/api/tmdb/netflix-originals
✅ API - Top Rated: https://my-streaming-dashboard-six.vercel.app/api/tmdb/top-rated
```

All should return data, not errors.

