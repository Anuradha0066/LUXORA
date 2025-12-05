import express from 'express';
import Booking from '../models/Booking.js'; // ✅ ESM import

const router = express.Router();

// Customer booking
router.post('/', async (req, res) => {
  const { userId, service, bookingDate, staffId } = req.body;

  // Basic validation
  if (!userId || !service || !bookingDate) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const booking = await Booking.create({ userId, service, bookingDate, staffId });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ✅ ESM default export
export default router;
