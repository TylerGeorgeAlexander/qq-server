const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const deckController = require("../controllers/deckController");

// Fetch search history entries for a specific deck
router.get("/:deckId/search-history", requireAuth, deckController.fetchSearchHistoryForDeck);

// Create a new deck
router.post("/", requireAuth, deckController.createDeck);

// Add search history question to a deck
router.post("/:deckId/add-search-history", requireAuth, deckController.addSearchHistoryToDeck);

// ... other routes ...

module.exports = router;