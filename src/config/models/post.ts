// models/Post.ts
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,  
  image: String,
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
