// routes/auth.js
import express from 'express';
import Staff from '../models/Staff.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);

    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const staff = await Staff.findOne({ email });
    console.log('DB staff found:', !!staff, staff ? { email: staff.email, role: staff.role, _id: staff._id } : null);

    if (!staff) {
      return res.status(401).json({ message: 'Invalid credentials - no staff' });
    }

    // Use the model method (you defined this in Staff schema)
    const ok = await staff.matchPassword(password);
    console.log('Password compare result:', ok);

    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials - wrong password' });
    }

    const token = jwt.sign(
      { id: staff._id, role: staff.role, email: staff.email },
      process.env.JWT_SECRET || 'change_me',
      { expiresIn: '8h' }
    );

    return res.json({ success: true, token, staff: { _id: staff._id, name: staff.name, email: staff.email, role: staff.role } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
