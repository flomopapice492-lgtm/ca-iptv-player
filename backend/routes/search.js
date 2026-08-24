const express = require('express');
const router = express.Router();
const channelService = require('../services/channelService');
const epgService = require('../services/epgService');

// Global search
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters' });
    }

    const [channels, programs] = await Promise.all([
      channelService.searchChannels(q),
      epgService.searchPrograms(q)
    ]);

    res.json({
      success: true,
      query: q,
      results: {
        channels: channels.slice(0, 10),
        programs: programs.slice(0, 10)
      },
      counts: {
        channels: channels.length,
        programs: programs.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Advanced search with filters
router.post('/advanced', async (req, res) => {
  try {
    const { q, type, year, genre, country } = req.body;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }

    let results = { channels: [], programs: [] };

    if (type === 'channel' || !type) {
      results.channels = await channelService.searchChannels(q);
      if (country) {
        results.channels = results.channels.filter(c => c.country === country.toUpperCase());
      }
    }

    if (type === 'program' || !type) {
      results.programs = await epgService.searchPrograms(q);
      if (year) {
        results.programs = results.programs.filter(p => new Date(p.start).getFullYear() === parseInt(year));
      }
      if (genre) {
        results.programs = results.programs.filter(p => p.category && p.category.includes(genre));
      }
    }

    res.json({
      success: true,
      query: q,
      filters: { year, genre, country },
      results,
      counts: {
        channels: results.channels.length,
        programs: results.programs.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
