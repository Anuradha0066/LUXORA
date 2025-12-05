import jwt from 'jsonwebtoken';
import Staff from '../models/Staff.js';

export const protectStaff = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const staff = await Staff.findById(decoded.id);
    if (!staff) return res.status(401).json({ message: 'Staff not found' });
    req.staff = staff;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
