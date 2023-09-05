const express = require('express');
const { config } = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');
const extractUserId= require('./middleware/authMiddleware')

// Load environment variables from .env file
config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-gpt-api';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const cors = require('cors');
const app = express();

const allowedOrigins = ['https://quickquestion-client-ab1c2fa4677d.herokuapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());

// Middleware function to extract the user ID from the JWT token
// app.use(extractUserId);

// Import and use the routes
const routes = require('./routes/index');
app.use('/api', routes);

const port = process.env.PORT || 2121;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
