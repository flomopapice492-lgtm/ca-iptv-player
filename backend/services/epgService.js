const axios = require('axios');
const cacheService = require('./cacheService');

class EPGService {
  constructor() {
    this.cache = cacheService;
    this.epgSources = [
      { name: 'iptv-org', url: 'https://epg.i.mjh.nz' },
      { name: 'open-epg', url: 'https://www.open-epg.com/api' }
    ];
  }

  async getEPG(date = null, limit = 100) {
    const cacheKey = `epg-${date || 'current'}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached.slice(0, limit);

    try {
      const epgData = this.generateMockEPG(date, limit);
      this.cache.set(cacheKey, epgData, 3600);
      return epgData;
    } catch (error) {
      console.error('Error fetching EPG:', error);
      return this.generateMockEPG(date, limit);
    }
  }

  async getChannelEPG(channelId, date = null, limit = 50) {
    const cacheKey = `epg-${channelId}-${date || 'current'}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const epg = this.generateMockEPG(date, 500);
    const channelEPG = epg.filter(p => p.channel === channelId).slice(0, limit);
    this.cache.set(cacheKey, channelEPG, 3600);
    return channelEPG;
  }

  async getEPGByYear(year) {
    const cacheKey = `epg-year-${year}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const epgData = this.generateMockEPG(null, 1000).filter(p => {
      const progDate = new Date(p.start);
      return progDate >= startDate && progDate <= endDate;
    });

    this.cache.set(cacheKey, epgData, 86400);
    return epgData;
  }

  async getEPGByGenre(genre) {
    const epgData = await this.getEPG();
    return epgData.filter(p =>
      p.category && p.category.toLowerCase().includes(genre.toLowerCase())
    );
  }

  async searchPrograms(query) {
    const epgData = await this.getEPG(null, 5000);
    const q = query.toLowerCase();
    return epgData.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  async getUpcomingPrograms(limit = 50) {
    const now = new Date();
    const epgData = await this.getEPG(null, 1000);
    return epgData
      .filter(p => new Date(p.start) > now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, limit);
  }

  generateMockEPG(date = null, limit = 100) {
    const programs = [];
    const channels = ['cbc-gem', 'ctv-ca', 'global-tv', 'citytv', 'tvo', 'aptn'];
    const genres = ['News', 'Sports', 'Drama', 'Comedy', 'Documentary', 'Children', 'Educational'];
    const titles = [
      'Morning News',
      'The Daily Show',
      'Sports Tonight',
      'Movie Night',
      'Documentary Series',
      'Kids Corner',
      'Drama Series',
      'Comedy Special',
      'Live Concert',
      'Nature Documentary'
    ];

    const targetDate = date ? new Date(date) : new Date();
    let count = 0;

    for (let i = 0; i < limit && count < limit; i++) {
      for (const channel of channels) {
        if (count >= limit) break;
        const hour = Math.floor(Math.random() * 24);
        const startTime = new Date(targetDate);
        startTime.setHours(hour, Math.floor(Math.random() * 60), 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + (Math.random() > 0.5 ? 1 : 2));

        programs.push({
          id: `program-${count}`,
          channel: channel,
          title: titles[Math.floor(Math.random() * titles.length)],
          description: 'Engaging content from Canadian broadcasters',
          category: genres[Math.floor(Math.random() * genres.length)],
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          duration: Math.floor((endTime - startTime) / 60000),
          rating: Math.floor(Math.random() * 10),
          icon: 'https://via.placeholder.com/300x200',
          year: startTime.getFullYear()
        });
        count++;
      }
    }

    return programs.sort((a, b) => new Date(a.start) - new Date(b.start));
  }
}

module.exports = new EPGService();
