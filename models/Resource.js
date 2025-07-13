import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium', // Reference the Stadium model
    required: true,
  },
  resources: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Store the file path or URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;