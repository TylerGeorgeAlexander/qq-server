const express = require('express');
const router = express.Router();

// Import API routes
const userRoutes = require('./api/userRoutes');
const deckRoutes = require('./api/deckRoutes');

// Mount API routes
router.use('/users', userRoutes);
router.use('/decks', deckRoutes);

module.exports = router;
