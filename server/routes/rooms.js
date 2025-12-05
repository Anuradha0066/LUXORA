import express from 'express';
import Room from '../models/Room.js';
import { protectStaff } from '../middleware/auth.js'; // ✅ fixed import
import { isAdmin } from '../middleware/role.js';

const router = express.Router();

// public: get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// admin: create room
router.post('/', protectStaff, isAdmin, async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
