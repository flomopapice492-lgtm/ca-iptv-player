const fs = require('fs');
const path = require('path');

class ChannelService {
  constructor() {
    this.channels = this.loadChannels();
  }

  loadChannels() {
    try {
      const channelPath = path.join(__dirname, '../data/legal-channels.json');
      if (fs.existsSync(channelPath)) {
        const data = fs.readFileSync(channelPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading channels:', error);
    }
    return this.getDefaultChannels();
  }

  getDefaultChannels() {
    return [
      {
        id: 'cbc-gem',
        name: 'CBC Gem',
        country: 'CA',
        category: 'General',
        logo: 'https://gem.cbc.ca/favicon.ico',
        url: 'https://gem.cbc.ca',
        streamUrl: 'https://gem.cbc.ca/live',
        description: 'Official CBC streaming service',
        license: 'CRTC-approved',
        verified: true
      },
      {
        id: 'ctv-ca',
        name: 'CTV',
        country: 'CA',
        category: 'General',
        logo: 'https://www.ctv.ca/favicon.ico',
        url: 'https://www.ctv.ca',
        streamUrl: 'https://www.ctv.ca/live',
        description: 'CTV live streaming',
        license: 'CRTC-approved',
        verified: true
      },
      {
        id: 'global-tv',
        name: 'Global TV',
        country: 'CA',
        category: 'General',
        logo: 'https://www.globaltv.com/favicon.ico',
        url: 'https://www.globaltv.com',
        streamUrl: 'https://www.globaltv.com/live',
        description: 'Global TV live streaming',
        license: 'CRTC-approved',
        verified: true
      },
      {
        id: 'citytv',
        name: 'Citytv',
        country: 'CA',
        category: 'General',
        logo: 'https://www.citytv.com/favicon.ico',
        url: 'https://www.citytv.com',
        streamUrl: 'https://www.citytv.com/live',
        description: 'Citytv live streaming',
        license: 'CRTC-approved',
        verified: true
      },
      {
        id: 'tvo',
        name: 'TVO',
        country: 'CA',
        category: 'Educational',
        logo: 'https://www.tvo.org/favicon.ico',
        url: 'https://www.tvo.org',
        streamUrl: 'https://www.tvo.org/live',
        description: 'TVO educational broadcasting',
        license: 'CRTC-approved',
        verified: true
      },
      {
        id: 'aptn',
        name: 'APTN',
        country: 'CA',
        category: 'Indigenous',
        logo: 'https://www.aptn.ca/favicon.ico',
        url: 'https://www.aptn.ca',
        streamUrl: 'https://www.aptn.ca/live',
        description: 'APTN indigenous media',
        license: 'CRTC-approved',
        verified: true
      }
    ];
  }

  async getAllChannels() {
    return this.channels;
  }

  async getChannelById(id) {
    return this.channels.find(channel => channel.id === id);
  }

  async searchChannels(query) {
    const q = query.toLowerCase();
    return this.channels.filter(channel =>
      channel.name.toLowerCase().includes(q) ||
      channel.category.toLowerCase().includes(q) ||
      channel.description.toLowerCase().includes(q)
    );
  }

  async getChannelsByCountry(countryCode) {
    return this.channels.filter(channel => channel.country === countryCode);
  }

  async getChannelsByCategory(category) {
    return this.channels.filter(channel =>
      channel.category.toLowerCase() === category.toLowerCase()
    );
  }
}

module.exports = new ChannelService();
