// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({  
  name: String,
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
