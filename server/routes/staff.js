import express from 'express';
import Staff from '../models/Staff.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("password....", password);
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await staff.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, token, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

export default router;
