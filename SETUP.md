# Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
OMDB_API_KEY=a60c7ded

# Required for client-side access in Next.js
NEXT_PUBLIC_TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
NEXT_PUBLIC_OMDB_API_KEY=a60c7ded
```

**Important:** In Next.js, environment variables that need to be accessed on the client-side must be prefixed with `NEXT_PUBLIC_`. This is why we have both versions in the `.env.local` file.

## Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Create the `.env.local` file (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

- If you see API errors, make sure the `.env.local` file exists and contains the correct API keys
- If images don't load, check that `next.config.js` has the correct image domains configured
- Clear your `.next` cache if you encounter build issues: `rm -rf .next`

