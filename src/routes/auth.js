const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Mock user database (in production, this would be a real database)
// WARNING: These are test credentials only. Remove before production deployment!
// Default test users: admin/admin123 and user/user123
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    // password: 'admin123' (hashed)
    password: '$2a$10$dkvrf3lZP1riEwlQS0uyA.DoTItBioT.drPNBiH8UZp.RJ0guwBNe',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    // password: 'user123' (hashed)
    password: '$2a$10$Kavi11pzrM/H3Rp7YIO/T.QAT4NmnqNTgmudZyrY3SPvCfA/4UHsu',
    role: 'user'
  }
];

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username and password are required'
      });
    }

    // Find user by username or email
    const user = users.find(u => u.username === username || u.email === username);

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /auth/me (protected)
router.get('/me', authMiddleware, (req, res, next) => {
  try {
    // req.user is set by authMiddleware after verifying JWT
    res.json({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
