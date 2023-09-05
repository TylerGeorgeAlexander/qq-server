// models/User.js
const mongoose = require('mongoose');

// Define the repetition interval schema
const repetitionIntervalSchema = new mongoose.Schema({
  interval: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  searchHistory: [{
    query: {
      type: String,
      required: true,
    },
    assertion: {
      type: String,
    },
    title: {
      type: String,
    },
    repetitionIntervals: [repetitionIntervalSchema],  // Array of repetition intervals
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
