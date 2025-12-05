import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
