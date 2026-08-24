# 🇨🇦 Legal Canadian IPTV Channels

This directory contains the playlist and metadata for legal, CRTC-approved Canadian television channels.

## Available Channels

### General Broadcast
1. **CBC Gem** - Official CBC streaming (News, Drama, Comedy, Documentary)
2. **CTV** - Bell Media streaming (News, Sports, Entertainment)
3. **Global TV** - Corus Entertainment streaming (News, Entertainment, Drama)
4. **Citytv** - Rogers Media streaming (News, Entertainment)

### Educational & Specialty
5. **TVO** - Ontario educational broadcasting
6. **APTN** - Indigenous media and cultural programming

## M3U Playlist Format

The `canada.m3u` file is in M3U (Multimedia Playlist) format:
- Compatible with most IPTV players (VLC, Kodi, Plex, etc.)
- Contains channel metadata (name, logo, EPG URL)
- Updated regularly to reflect current broadcaster URLs

## Legal Compliance

✅ All channels are **CRTC-licensed broadcasters**
✅ Stream URLs are from **official broadcaster sources**
✅ No pirated or unauthorized content
✅ No DRM circumvention
✅ Transparent source attribution

## Usage

### In the CA IPTV Player
Channels are automatically loaded from `legal-channels.json`

### In Other Players (VLC, Kodi)
1. Copy the path to `canada.m3u`
2. Open your player's playlist/import function
3. Paste the URL or file path

### As a Remote URL
```
https://raw.githubusercontent.com/flomopapice492-lgtm/ca-iptv-player/main/public-channels/canada.m3u
```

## Adding New Channels

To add a new legal Canadian channel:

1. Verify CRTC licensing: https://www.crtc.gc.ca
2. Find the official streaming URL
3. Add entry to `canada.m3u` in M3U format:
   ```
   #EXTINF:-1 tvg-id="channel-id" tvg-name="Channel Name" tvg-logo="http://logo.url" group-title="Category",Channel Name
   http://stream.url
   ```
4. Update `backend/data/legal-channels.json`
5. Submit PR with verification documentation

## EPG Sources

Electronic Program Guide (TV schedule) data is sourced from:
- **iptv-org/epg** - Community-maintained, open-source EPG aggregator
- **Official broadcaster EPGs** - Where available
- **Open-EPG** - Free EPG builder service

All EPG sources are publicly available and free to use.

## Notes

- Stream URLs are subject to change by broadcasters
- Some streams may be geo-restricted to Canada
- Broadcasters' terms of service apply to all users
- Support contacting broadcaster if streams are unavailable

## License

This channel list is provided under MIT License. Channel content remains under broadcaster ownership.

---

**Last Updated:** 2026-08-24  
**Verified Channels:** 6  
**Status:** ✅ All Channels Active
