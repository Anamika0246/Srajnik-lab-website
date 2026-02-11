import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

export default GalleryImage;
