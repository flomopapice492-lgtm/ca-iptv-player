# Canadian IPTV Player - Quick Start Guide

## 🚀 Installation & Running

### Option 1: Docker (Recommended)

**Requirements:** Docker & Docker Compose

```bash
cd ca-iptv-player

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

✅ Open http://localhost:3000

### Option 2: Local Development

**Requirements:** Node.js 16+, npm

```bash
# Install dependencies
npm install

# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

✅ Open http://localhost:3000

---

## 📺 Using the Player

### Basic Controls

| Action | Control |
|--------|----------|
| Play/Pause | Space or click play button |
| Next Channel | Right arrow or click next |
| Previous Channel | Left arrow or click previous |
| Volume | +/- keys or click volume |
| Full Screen | F or click fullscreen button |
| Search | Click search, type channel name |
| Year Filter | Click year buttons in EPG section |

### Features

1. **Live Channels**
   - Select from sidebar
   - Click channel to switch
   - Add to favorites with star icon

2. **Program Guide (EPG)**
   - Shows current and upcoming programs
   - Filter by year (1998-2026)
   - Click program for details

3. **Search**
   - Find channels by name
   - Search program titles
   - Filter by genre, year

4. **Settings**
   - Toggle dark/light theme
   - Manage favorites
   - Configure playback

---

## 🔌 API Reference

### Channels

```bash
# List all channels
curl http://localhost:5000/api/channels

# Search channels
curl http://localhost:5000/api/channels/search/query?q=CBC

# Get channel by ID
curl http://localhost:5000/api/channels/cbc-gem
```

### EPG

```bash
# Get current EPG
curl http://localhost:5000/api/epg

# Get channel schedule
curl http://localhost:5000/api/epg/channel/cbc-gem

# Filter by year
curl http://localhost:5000/api/epg/year/2024

# Search programs
curl http://localhost:5000/api/epg/search/programs?q=news
```

### Search

```bash
# Global search
curl http://localhost:5000/api/search?q=CBC

# Advanced search
curl -X POST http://localhost:5000/api/search/advanced \
  -H "Content-Type: application/json" \
  -d '{
    "q": "news",
    "type": "program",
    "year": 2024,
    "genre": "News"
  }'
```

---

## 🛠️ Configuration

### Environment Variables

Create `.env` file in root directory:

```env
# Backend
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# EPG
EPG_UPDATE_INTERVAL=3600000  # 1 hour
EPG_CACHE_DIR=./epg-data/cache

# API
API_RATE_LIMIT=100
API_CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

---

## 🐛 Troubleshooting

### Channels Not Loading

1. Check backend is running: `curl http://localhost:5000/health`
2. Check browser console for errors (F12)
3. Restart backend: `npm run backend`

### EPG Shows No Data

1. Verify internet connection
2. Check EPG sources: `curl https://epg.i.mjh.nz`
3. Clear cache: `rm -rf epg-data/cache/*`
4. Restart backend

### Player Won't Play

1. Check stream URL is accessible
2. Browser might block embedded streams (check CORS)
3. Some streams require geo-location (Canada only)
4. Try different channel

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

---

## 📚 Documentation

- **[README.md](README.md)** - Full documentation
- **[LEGAL.md](LEGAL.md)** - Legal compliance details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment

---

## 🆘 Getting Help

1. Check existing issues: https://github.com/flomopapice492-lgtm/ca-iptv-player/issues
2. Search documentation
3. Create a new issue with:
   - Steps to reproduce
   - What you expected
   - What actually happened
   - Browser/OS version

---

## 📝 License

MIT License - See LICENSE file

---

**Happy watching! 📺**
