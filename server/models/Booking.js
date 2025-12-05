import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({

  // Old fields (you asked not to remove)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: String },
  bookingDate: { type: Date },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },

  // New fields according to your UI payload
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  roomName: { type: String, required: true },
  roomId: { type: Number, required: true },

  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },

  adults: { type: Number, default: 1 },
  kids: { type: Number, default: 0 },

  price: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },

}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
