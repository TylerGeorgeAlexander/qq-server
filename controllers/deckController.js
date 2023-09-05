const Deck = require("../models/Deck");
const User = require("../models/User"); // Import the User model

const getAllDecks = async (req, res) => {
    try {
        const decks = await Deck.find();
        res.status(200).json(decks);
    } catch (error) {
        console.error("Error fetching decks:", error);
        res.status(500).json({ error: 'Failed to fetch decks' });
    }
}

const fetchSearchHistoryForDeck = async (req, res) => {
    try {
        const { deckId } = req.params;
        const userId = req.userId;

        const targetDeck = await Deck.findOne({ _id: deckId, user: userId });

        if (!targetDeck) {
            return res.status(404).json({ message: "Deck not found" });
        }

        const searchHistoryIds = targetDeck.searchHistory;

        const user = await User.findById(userId); // Fetch the user

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const searchHistoryEntries = user.searchHistory.filter(entry =>
            searchHistoryIds.includes(entry._id.toString())
        );

        return res.status(200).json({ searchHistory: searchHistoryEntries });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const createDeck = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;

        const newDeck = new Deck({
            name,
            user: userId,
        });

        await newDeck.save();

        return res.status(201).json({ message: "Deck created", deck: newDeck });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addSearchHistoryToDeck = async (req, res) => {
    try {
        const { deckId } = req.params;
        const searchHistoryId = req.body.searchHistoryId;

        const targetDeck = await Deck.findById(deckId);

        if (!targetDeck) {
            return res.status(404).json({ message: "Deck not found" });
        }

        const searchHistory = await User.findById(searchHistoryId); // Fetch the search history from User model

        if (!searchHistory) {
            return res.status(404).json({ message: "Search history not found" });
        }

        targetDeck.searchHistory.push(searchHistory);

        await targetDeck.save();

        return res.status(200).json({ message: "Search history added to deck" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllDecks,
    fetchSearchHistoryForDeck,
    createDeck,
    addSearchHistoryToDeck,
    // ... other controller functions ...
};
