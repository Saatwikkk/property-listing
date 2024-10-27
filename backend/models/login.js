const express = require('express');
const bcrypt = require('bcrypt');  // For hashing passwords
const jwt = require('jsonwebtoken');  // For creating JWT tokens
const User = require('./user');  // Import your User model
const router = express.Router();

// JWT secret key
const JWT_SECRET = 'your_jwt_secret_key';

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password (assuming the password is hashed during signup)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

module.exports = router;
