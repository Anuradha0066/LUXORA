import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // add other fields if needed
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
