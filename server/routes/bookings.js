import express from 'express';
import Booking from '../models/Booking.js';
import { protectStaff } from '../middleware/auth.js';
import Staff from '../models/Staff.js';
import User from '../models/User.js';

const router = express.Router();

// Customer: create booking
router.post('/', async (req, res) => {
  const {
    userId,
    service,
    bookingDate,
    staffId,
    guestName,
    guestEmail,
    roomName,
    roomId,
    checkIn,
    checkOut,
    adults,
    kids,
    price
  } = req.body;

  // Validate new required fields
  if (!guestName || !guestEmail || !roomName || !roomId || !checkIn || !checkOut || !price) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const booking = await Booking.create({
      userId,        // optional
      service,       // optional
      bookingDate,   // optional
      staffId,       // optional
      guestName,
      guestEmail,
      roomName,
      roomId,
      checkIn,
      checkOut,
      adults,
      kids,
      price,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});


// Staff: get all bookings (populated with user & staff info)
router.get('/', protectStaff, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')   // show user name/email
      .populate('staffId', 'name email')  // show staff name/email
      .sort({ bookingDate: 1 });          // sort by booking date

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

export default router;
