const express = require('express');
const router = express.Router();
const channelService = require('../services/channelService');

// Get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await channelService.getAllChannels();
    res.json({ success: true, data: channels, count: channels.length });
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get channel by ID
router.get('/:id', async (req, res) => {
  try {
    const channel = await channelService.getChannelById(req.params.id);
    if (!channel) {
      return res.status(404).json({ success: false, error: 'Channel not found' });
    }
    res.json({ success: true, data: channel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search channels
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    const results = await channelService.searchChannels(q);
    res.json({ success: true, data: results, count: results.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get channels by country
router.get('/country/:code', async (req, res) => {
  try {
    const channels = await channelService.getChannelsByCountry(req.params.code.toUpperCase());
    res.json({ success: true, data: channels, count: channels.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get channels by category
router.get('/category/:category', async (req, res) => {
  try {
    const channels = await channelService.getChannelsByCategory(req.params.category);
    res.json({ success: true, data: channels, count: channels.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
