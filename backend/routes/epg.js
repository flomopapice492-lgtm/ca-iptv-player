const express = require('express');
const router = express.Router();
const epgService = require('../services/epgService');

// Get EPG for all channels
router.get('/', async (req, res) => {
  try {
    const { date, limit } = req.query;
    const epg = await epgService.getEPG(date, limit);
    res.json({ success: true, data: epg });
  } catch (error) {
    console.error('Error fetching EPG:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get EPG for specific channel
router.get('/channel/:channelId', async (req, res) => {
  try {
    const { date, limit } = req.query;
    const epg = await epgService.getChannelEPG(req.params.channelId, date, limit);
    if (!epg || epg.length === 0) {
      return res.status(404).json({ success: false, error: 'No EPG data found' });
    }
    res.json({ success: true, data: epg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Filter EPG by year
router.get('/year/:year', async (req, res) => {
  try {
    const year = parseInt(req.params.year, 10);
    if (isNaN(year) || year < 1998 || year > 2026) {
      return res.status(400).json({ success: false, error: 'Year must be between 1998 and 2026' });
    }
    const epg = await epgService.getEPGByYear(year);
    res.json({ success: true, data: epg, year, count: epg.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Filter EPG by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const programs = await epgService.getEPGByGenre(req.params.genre);
    res.json({ success: true, data: programs, count: programs.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search programs
router.get('/search/programs', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    const results = await epgService.searchPrograms(q);
    res.json({ success: true, data: results, count: results.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get upcoming programs
router.get('/upcoming', async (req, res) => {
  try {
    const { limit } = req.query;
    const programs = await epgService.getUpcomingPrograms(limit || 50);
    res.json({ success: true, data: programs, count: programs.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
