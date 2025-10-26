import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Staff from '../models/Staff.js';
dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotel';

mongoose.connect(MONGO)
  .then(async () => {
    const exists = await Staff.findOne({ email: 'admin@ashirwad' });
    if (!exists) {
      const pw = await bcrypt.hash('123456', 10);
      await Staff.create({ username: 'admin', email: 'admin@ashirwad', passwordHash: pw, role: 'admin' });
      console.log('Admin created');
    } else {
      console.log('Admin exists');
    }
    process.exit();
  })
  .catch(err => { console.error(err); process.exit(1); });
