import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = await User.create({ name, email });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

export default router;
