import express from 'express';
import Staff from '../models/Staff.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Login attempt:", req.body);

  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, staff.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: staff._id, role: staff.role, email: staff.email },
      process.env.JWT_SECRET || 'change_me',
      { expiresIn: '8h' }
    );

    res.json({ token, user: { username: staff.username, email: staff.email, role: staff.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
