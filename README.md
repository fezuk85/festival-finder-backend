# Festival Finder Backend

Standalone Node.js backend for Alan Festival Finder app. Works on any Node.js hosting platform.

## Quick Start

### Local Development
```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

### Production Build
```bash
npm install
npm run build
npm start
```

## Deployment Options

### Option 1: Render (Recommended - Free tier available)
1. Push this folder to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set build command: `npm run build`
6. Set start command: `npm start`
7. Deploy

### Option 2: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Railway auto-detects Node.js and deploys

### Option 3: Heroku
```bash
heroku create festival-finder-backend
git push heroku main
```

### Option 4: DigitalOcean App Platform
1. Connect GitHub repo
2. Select Node.js runtime
3. Set build/start commands
4. Deploy

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/trpc/invites.create` — Create friend invite
- `POST /api/trpc/invites.accept` — Accept invite
- `POST /api/trpc/locations.share` — Share location
- `POST /api/trpc/friends.list` — List friends

## WebSocket Events

- `location:update` — Real-time location sync
- `friend:added` — Friend added notification
- `invite:accepted` — Invite accepted notification

## Environment Variables

- `PORT` — Server port (default: 3000)
- `DATABASE_URL` — PostgreSQL connection string (optional for mock mode)

## Notes

This is a mock backend for testing. For production with real data persistence, add:
- PostgreSQL database
- Drizzle ORM migrations
- Authentication middleware
- Rate limiting
- Error handling
