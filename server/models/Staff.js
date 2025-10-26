import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'staff' } // 'admin' or 'staff'
}, { timestamps: true });

export default mongoose.model('Staff', StaffSchema);
