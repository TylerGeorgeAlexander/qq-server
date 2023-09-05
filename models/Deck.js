const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  searchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "SearchHistory" }],
  decks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deck" }],
});

module.exports = mongoose.model("Deck", deckSchema);
