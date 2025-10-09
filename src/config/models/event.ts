// models/Event.ts
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: String,
  time: String,
  location: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
