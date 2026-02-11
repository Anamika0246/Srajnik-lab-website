import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  email: {
    type: String,
    required: true,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  isLabHead: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
