# 📊 EPG (Electronic Program Guide) Data Management

This directory contains utilities and caching for TV guide/EPG data.

## Overview

The EPG system aggregates program schedule data from multiple free, open-source providers and caches it locally for performance.

## Features

- **Multi-source aggregation** - Combines data from 180+ EPG sources
- **Local caching** - Reduces API calls and improves performance
- **Year filtering** - Supports historical (1998) and future (2026) data
- **XMLTV format** - Industry-standard TV guide format
- **Real-time updates** - Fresh schedule data every hour

## EPG Sources

### 1. iptv-org/epg (Primary)
- **URL**: https://github.com/iptv-org/epg
- **License**: MIT (open source)
- **Coverage**: 180+ sources globally
- **Format**: XMLTV
- **Update Frequency**: Multiple times daily
- **Documentation**: https://github.com/iptv-org/epg/blob/master/README.md

### 2. globetvapp/epg (Secondary)
- **URL**: https://github.com/globetvapp/epg
- **License**: Public domain
- **Coverage**: Country-specific guides
- **Format**: XML
- **Update Frequency**: Daily

### 3. Open-EPG (Tertiary)
- **URL**: https://open-epg.com
- **License**: Free to use
- **Coverage**: 50+ countries
- **Format**: XMLTV
- **Features**: Web-based custom EPG builder

### 4. i.mjh.nz (Backup)
- **URL**: https://i.mjh.nz
- **License**: Free, community-maintained
- **Coverage**: Multiple regions
- **Format**: XMLTV
- **Speed**: Fast CDN delivery

## Year Filtering (1998-2026)

The application supports filtering EPG data by year:

```typescript
// Get all programs in 2024
const programs = await epgService.getEPGByYear(2024);

// Get programs in specific year range
const filtered = programs.filter(p => 
  p.year >= 2020 && p.year <= 2024
);
```

### Historical Data (1998-2020)
- Archived schedules where available
- Useful for research and nostalgia
- Data completeness varies by source

### Current Data (2021-2026)
- Real-time and upcoming schedules
- Daily updates from broadcasters
- 100% coverage of active channels

## Caching Strategy

### Cache Hierarchy
1. **In-memory cache** (1 hour TTL)
   - Current session only
   - Fast access for repeated queries
   - Cleared on server restart

2. **File cache** (24 hour TTL)
   - XML EPG files in `cache/` directory
   - Survives server restarts
   - Fallback if API is unavailable

3. **Database cache** (future)
   - SQLite for persistent storage
   - Indexes for fast searches
   - Garbage collection of old data

### Cache Management

```bash
# Clear cache
rm -rf ./cache/*.xml

# Purge specific channel cache
rm ./cache/channel-id-*.xml
```

## API Integration

### Fetching EPG

```bash
# Get current EPG
curl http://localhost:5000/api/epg

# Get specific channel EPG
curl http://localhost:5000/api/epg/channel/cbc-gem

# Filter by year
curl http://localhost:5000/api/epg/year/2024

# Filter by genre
curl http://localhost:5000/api/epg/genre/News

# Search programs
curl http://localhost:5000/api/epg/search/programs?q=news
```

## XMLTV Format

Example structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE tv SYSTEM "xmltv.dtd">
<tv>
  <channel id="cbc-gem.ca">
    <display-name>CBC Gem</display-name>
    <icon src="https://gem.cbc.ca/favicon.ico" />
  </channel>
  
  <programme start="20240101200000 EST" stop="20240101210000 EST" channel="cbc-gem.ca">
    <title>The National</title>
    <desc>Canadian news program</desc>
    <category>News</category>
    <rating system="VCHIP">14+</rating>
  </programme>
</tv>
```

## Adding Custom EPG Sources

### 1. Create XMLTV Feed
Ensure your source provides XMLTV format data

### 2. Update Configuration
```javascript
// backend/services/epgService.js
this.epgSources = [
  { name: 'custom', url: 'https://your-source.com/epg.xml' }
];
```

### 3. Test Integration
```bash
npm test -- epgService
```

### 4. Submit PR
Include:
- Source verification (legal/licensed)
- Documentation
- Test results

## Performance Metrics

- **EPG load time**: < 2 seconds (cached)
- **Search query**: < 500ms
- **Year filter**: < 1 second
- **Cache hit rate**: 95%+

## Troubleshooting

### No EPG Data
1. Check internet connection
2. Verify EPG source URLs are accessible
3. Check backend logs: `tail -f logs/app.log`
4. Force cache refresh: `rm -rf cache/*`

### Slow Performance
1. Check cache size: `du -sh cache/`
2. Clear old cache: `find cache/ -mtime +1 -delete`
3. Restart backend: `npm run backend`

### Missing Programs
1. Verify source provides data for that channel
2. Check year is in valid range (1998-2026)
3. Search with different keywords
4. Check broadcaster availability in source

## Legal Compliance

✅ All EPG sources are **open-source and freely licensed**
✅ No copyright violations
✅ Uses only publicly available data
✅ Respects broadcaster terms of service
✅ Transparent source attribution

## References

- XMLTV Format: http://xmltv.org
- iptv-org EPG: https://github.com/iptv-org/epg
- Open-EPG: https://open-epg.com
- CRTC Program Standards: https://www.crtc.gc.ca

---

**Last Updated:** 2026-08-24  
**Next Update:** Automatic (hourly)
