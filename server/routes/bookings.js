import express from 'express';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth.js';
import { isAdmin } from '../middleware/role.js';
const router = express.Router();

// public: create booking
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const booking = await Booking.create(data);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// protected: list bookings for staff/admin
router.get('/', auth,  async (req, res) => {
  try {
    const list = await Booking.find().sort({ createdAt: -1 }).limit(500);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
