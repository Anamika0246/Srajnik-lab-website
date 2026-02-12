import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Event', 'News'],
    default: 'Event',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
