import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Staff from '../models/Staff.js'; // <-- fixed path

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Remove old admin
    await Staff.deleteMany({ email: 'admin@ashirwad' });

    // Create new admin (password will be hashed automatically)
    const admin = await Staff.create({
      name: 'admin',
      email: 'admin@ashirwad',
      password: '123456',
      role: 'admin'
    });

    console.log('Admin created:', admin);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
