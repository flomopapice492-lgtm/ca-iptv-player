# 📺 Canadian IPTV Player with EPG

A modern, legal, and fully functional IPTV player for Canadian television with Electronic Program Guide (EPG), featuring:

- ✅ **100% Legal** - Uses CRTC-approved and public IPTV sources
- 📺 **Live Canadian Channels** - CBC, CTV, Global, Citytv, and more
- 📅 **Full EPG Timeline** - 1998–2026 program listings
- 🔍 **Year-based Filtering** - Filter TV guide by year
- 🎬 **Modern Web Player** - Responsive, feature-rich HLS/DASH player
- 🖥️ **Cross-Platform** - Works on desktop, tablet, and mobile
- 🐳 **Docker Support** - One-command deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/flomopapice492-lgtm/ca-iptv-player.git
cd ca-iptv-player

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Start development server
cd ..
npm run dev
```

Access the app at: **http://localhost:3000**

### Docker Deployment

```bash
# Build and start
npm run docker:build
npm run docker:up

# Stop
npm run docker:down
```

---

## 📁 Project Structure

```
ca-iptv-player/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   ├── channels.js        # Channel endpoints
│   │   ├── epg.js             # EPG endpoints
│   │   └── search.js          # Search functionality
│   ├── services/
│   │   ├── epgService.js      # EPG data fetching
│   │   ├── channelService.js  # Channel management
│   │   └── cacheService.js    # EPG caching
│   ├── data/
│   │   └── legal-channels.json # Public IPTV channels
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Player.tsx          # Video player
│   │   │   ├── ChannelList.tsx     # Channel sidebar
│   │   │   ├── EPGGuide.tsx        # Program guide
│   │   │   ├── YearFilter.tsx      # Year selection
│   │   │   └── ProgramDetails.tsx  # Program info
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── About.tsx
│   │   ├── hooks/
│   │   │   ├── useEPG.ts
│   │   │   ├── useChannels.ts
│   │   │   └── usePlayer.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── public-channels/
│   ├── canada.m3u             # IPTV playlist (M3U format)
│   └── README.md              # Channels documentation
├── epg-data/
│   ├── parser.js              # XMLTV parser
│   ├── README.md              # EPG sources info
│   └── cache/                 # Cached EPG XML files
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

---

## 🎯 Features

### 1. Live TV Streaming
- Direct streaming from legal Canadian broadcasters
- HLS/DASH protocol support
- Adaptive bitrate selection
- Full-screen mode
- Picture-in-picture (PiP)

### 2. EPG (Electronic Program Guide)
- Real-time TV schedule
- Channel-based programming timeline
- Search programs by name
- Filter by year (1998–2026)
- Program descriptions and ratings
- Genre categorization

### 3. Channel Management
- Browse all available Canadian channels
- Channel search and favorites
- Custom channel grouping
- Channel logos and metadata

### 4. User Interface
- Dark/Light theme toggle
- Responsive design (mobile-first)
- Keyboard shortcuts
- Settings panel
- History and bookmarks

---

## 🔒 Legal Compliance

This project uses **100% legal and public IPTV sources**:

✅ **Official Broadcaster Apps:**
- CBC Gem (Canadian Broadcasting Corporation)
- CTV.ca (Bell Media)
- Global TV (Corus Entertainment)
- Citytv.com (Rogers Media)

✅ **Public IPTV Repositories:**
- iptv-org/iptv (Open-source, community-maintained)
- Government and non-profit media channels

✅ **CRTC Compliance:**
- All channels included are licensed and authorized for broadcast in Canada
- No unauthorized or pirated content
- Transparent source attribution

**Read more:** See `LEGAL.md` for full compliance details.

---

## 🌐 EPG Data Sources

The application integrates with multiple free, open-source EPG providers:

1. **iptv-org/epg** - 180+ sources globally
   - XMLTV format support
   - Programmatic API

2. **globetvapp/epg** - Country-specific EPG guides
   - Free XML feeds
   - Regular updates

3. **Open-EPG** - Customizable EPG builder
   - Web interface
   - Multi-channel support

4. **i.mjh.nz** - Fast, reliable XMLTV feeds
   - Real-time updates
   - Multiple regions

Caching system automatically stores EPG data locally to reduce API calls.

---

## 📊 Year Filter (1998–2026)

The EPG system includes historical and future programming data:

```typescript
// Filter programs by year range
const programs = await getEPGByYear(1998, 2026);
const filtered = programs.filter(p => p.year === 2024);
```

- View historical TV schedules
- Plan upcoming programming
- Analyze TV trends over decades
- Archive and restore guides

---

## 🛠️ API Endpoints

### Channels
```
GET /api/channels              # List all channels
GET /api/channels/:id          # Get channel details
GET /api/channels/search       # Search channels
POST /api/channels/favorites   # Add to favorites
```

### EPG
```
GET /api/epg                   # Current EPG data
GET /api/epg/:channelId        # Channel schedule
GET /api/epg/search            # Search programs
GET /api/epg/year/:year        # Filter by year
GET /api/epg/genre/:genre      # Filter by genre
```

### Search
```
GET /api/search                # Global search
GET /api/search/programs       # Program search
```

---

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `→` | Next channel |
| `←` | Previous channel |
| `F` | Full screen |
| `M` | Mute |
| `+` | Volume up |
| `-` | Volume down |
| `T` | Toggle theme |
| `G` | Toggle guide |

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px – 1024px
- **Desktop:** > 1024px

---

## 🔐 Security

- No tracking or analytics
- No user data collection
- Open-source, auditable code
- HTTPS-ready
- CORS-protected API

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see `LICENSE` file for details.

---

## 📧 Support

- **Issues:** GitHub Issues
- **Documentation:** `/docs` directory
- **Legal Questions:** See `LEGAL.md`

---

## 🙏 Acknowledgments

- [iptv-org](https://github.com/iptv-org) - Open IPTV ecosystem
- [CBC, CTV, Global, Citytv](https://www.canada.ca) - Legal broadcasters
- [CRTC](https://www.crtc.gc.ca) - Canadian broadcasting regulator
- Community contributors and maintainers

---

**Made with ❤️ for Canadian viewers**
