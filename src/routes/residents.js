const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All resident routes require authentication
router.use(authMiddleware);

// GET /residents
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Residents endpoint - To be implemented',
    data: []
  });
});

// GET /residents/:id
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get resident by ID - To be implemented',
    data: null
  });
});

// POST /residents
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create resident - To be implemented',
    data: null
  });
});

// PUT /residents/:id
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Update resident - To be implemented',
    data: null
  });
});

// DELETE /residents/:id
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Delete resident - To be implemented',
    data: null
  });
});

module.exports = router;
