import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
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
    required: true,
    enum: ['Tutorial', 'Documentation', 'Video', 'PDF', 'Course', 'Article', 'Other']
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  }
}, {
  timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
