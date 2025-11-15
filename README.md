# StreamFlix - Streaming Dashboard

A Netflix-like streaming dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎬 Browse trending movies and TV shows
- 🎭 Multiple genre categories (Action, Comedy, Horror, Romance, Documentaries)
- 🎨 Netflix-inspired UI/UX design
- 📱 Fully responsive design
- 🔍 Search functionality (coming soon)
- 🎥 Movie details with ratings and information

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TMDB API** - Movie and TV show data
- **OMDB API** - Additional movie details and ratings
- **Axios** - HTTP client
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd streaming-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
TMDB_API_KEY=5b815bf91fa942c41e80fda28f9746d2
OMDB_API_KEY=a60c7ded
```

**Note:** We use server-side API routes, so only `TMDB_API_KEY` (without `NEXT_PUBLIC_` prefix) is needed. The API key stays secure on the server.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
streaming-dashboard/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero banner section
│   ├── MovieCard.tsx        # Movie card component
│   └── Row.tsx              # Movie row/carousel component
├── lib/
│   ├── tmdb.ts              # TMDB API service
│   └── omdb.ts              # OMDB API service
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## API Keys

The application uses two APIs:

1. **TMDB (The Movie Database)**: Primary source for movie/TV show data, images, and metadata
2. **OMDB (Open Movie Database)**: Additional movie details, ratings, and reviews

Make sure to add your API keys to the `.env.local` file. For production (Vercel), add them in the project settings.

**Security Note:** API keys are kept secure using Next.js API routes. The keys are never exposed to the client-side code.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Features in Detail

### Home Page
- Hero section with featured content
- Multiple rows of categorized content
- Horizontal scrolling carousels
- Hover effects on movie cards

### Movie Cards
- Poster images
- Title and release year
- Rating display
- Hover overlay with additional information
- Quick action buttons (Play, More Info)

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interactions

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This application can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

## License

This project is for educational purposes.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Open Movie Database (OMDB)](http://www.omdbapi.com/)
- Netflix for design inspiration

