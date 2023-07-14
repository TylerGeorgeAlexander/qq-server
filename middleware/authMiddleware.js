const jwt = require('jsonwebtoken');

const extractUserId = (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if the header is present
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Attach the user ID to the request object
      req.userId = decodedToken.userId;

      // Proceed to the next middleware
      next();
    });
  } catch (error) {
    console.error('Error during token extraction:', error);
    res.status(500).json({ error: 'An error occurred during token extraction' });
  }
};

const requireAuth = (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if the header is present
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Attach the user ID to the request object
      req.userId = decodedToken.userId;

      // Proceed to the next middleware
      next();
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'An error occurred during authentication' });
  }
};

module.exports = { extractUserId, requireAuth };
