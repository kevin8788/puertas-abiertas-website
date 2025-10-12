// models/subscription_email.ts
import mongoose from 'mongoose';

const subscribeSchema = new mongoose.Schema({   
  email: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.Subscribed_emails || mongoose.model('subscribed_emails', subscribeSchema);
