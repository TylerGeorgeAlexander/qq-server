const express = require("express");
const router = express.Router();
const { requireAuth } = require('../../middleware/authMiddleware');
const deckController = require("../controllers/deckController");

// Route to fetch all decks
router.get('/', requireAuth, deckController.getAllDecks);

// Create a new deck
router.post("/", requireAuth, deckController.createDeck);

// Fetch search history entries for a specific deck
router.get("/:deckId/search-history", requireAuth, deckController.fetchSearchHistoryForDeck);

// Add search history question to a deck
router.post("/:deckId/add-search-history", requireAuth, deckController.addSearchHistoryToDeck);

// ... other routes ...

module.exports = router;
