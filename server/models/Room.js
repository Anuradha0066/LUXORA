import mongoose from 'mongoose';

const FacilitySchema = new mongoose.Schema({
  name: String
});

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  facilities: [FacilitySchema],
  size: Number,
  maxPerson: Number,
  price: Number,
  image: String,
  imageLg: String
}, { timestamps: true });

export default mongoose.model('Room', RoomSchema);
