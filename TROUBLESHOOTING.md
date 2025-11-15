# Troubleshooting Guide

## Common Issues and Solutions

### Issue: Site Shows "Loading..." or Blank Page

**Possible Causes:**
1. Environment variables not set in Vercel
2. API routes failing
3. Build errors

**Solutions:**

#### 1. Check Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ensure these are set:
   ```
   TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
   OMDB_API_KEY=a60c7ded
   ```
3. Make sure they're added for **all environments** (Production, Preview, Development)
4. **Redeploy** after adding/updating variables

#### 2. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Functions
2. Click on any API route (e.g., `/api/tmdb/trending`)
3. Check the logs for errors
4. Common errors:
   - `API key not configured` → Environment variable not set
   - `401 Unauthorized` → Invalid API key
   - `500 Internal Server Error` → Check function logs

#### 3. Verify API Routes Are Working

Test the API routes directly:
- `https://my-streaming-dashboard-six.vercel.app/api/tmdb/trending`
- Should return JSON data, not an error

#### 4. Check Browser Console

1. Open your deployed site
2. Press F12 to open Developer Tools
3. Check the Console tab for errors
4. Check the Network tab to see which requests are failing

### Issue: 401 Unauthorized Errors

**Cause:** API key not accessible or invalid

**Solution:**
1. Verify `TMDB_API_KEY` is set in Vercel (not `NEXT_PUBLIC_TMDB_API_KEY`)
2. Ensure the API key value is correct
3. Redeploy after setting environment variables

### Issue: Build Fails on Vercel

**Possible Causes:**
1. TypeScript errors
2. Missing dependencies
3. Build configuration issues

**Solutions:**
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix any TypeScript or dependency errors
4. Ensure `package.json` has all required dependencies

### Issue: API Routes Return 500 Errors

**Possible Causes:**
1. Environment variable not accessible in API route
2. TMDB API key invalid or expired
3. Network issues

**Solutions:**
1. Verify environment variable is set in Vercel
2. Test API key directly with TMDB API
3. Check Vercel function logs for specific error messages

### Issue: Images Not Loading

**Possible Causes:**
1. Next.js image domain not configured
2. TMDB image URLs blocked

**Solution:**
- Check `next.config.js` has correct image domains:
  ```js
  images: {
    domains: ['image.tmdb.org', 'www.themoviedb.org'],
  }
  ```

## Testing Locally

Before deploying, always test locally:

1. Create `.env.local` file:
   ```env
   TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
   OMDB_API_KEY=a60c7ded
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test API routes:
   - http://localhost:3000/api/tmdb/trending
   - Should return JSON data

4. Test the application:
   - http://localhost:3000
   - Check browser console for errors
   - Verify all movie rows load

## Quick Health Check

Run these checks to verify deployment:

1. ✅ **Homepage loads**: `https://my-streaming-dashboard-six.vercel.app/`
2. ✅ **API route works**: `https://my-streaming-dashboard-six.vercel.app/api/tmdb/trending`
3. ✅ **No console errors**: Check browser DevTools
4. ✅ **Environment variables set**: Check Vercel dashboard
5. ✅ **Build successful**: Check Vercel deployment logs

## Getting Help

If issues persist:

1. Check Vercel documentation: https://vercel.com/docs
2. Review Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
3. Check TMDB API status: https://www.themoviedb.org/
4. Review deployment logs in Vercel dashboard

