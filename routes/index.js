const express = require('express');
const router = express.Router();

// Import API routes
const userRoutes = require('./api/userRoutes');

// Mount API routes
router.use('/users', userRoutes);

module.exports = router;
