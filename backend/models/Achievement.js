import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['certification', 'award', 'competition', 'publication', 'other'],
    default: 'other'
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  certificateUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
achievementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement; 