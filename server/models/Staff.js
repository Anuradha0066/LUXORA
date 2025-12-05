import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ⚡ important
  role: { type: String, enum: ['staff', 'admin'], default: 'staff' },
}, { timestamps: true });

StaffSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StaffSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Staff', StaffSchema);
