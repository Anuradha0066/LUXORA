import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  guest: { type: String, required: true },
  email: { type: String, required: true },
  room: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
