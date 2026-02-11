import express from 'express';
import upload from '../middleware/upload.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Upload single image
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folder = req.body.folder || 'srajnik-lab/general';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Upload failed' });
  }
});

// Upload multiple images
router.post('/images', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const folder = req.body.folder || 'srajnik-lab/general';
    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, folder)
    );

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      images: results.map(result => ({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Upload failed' });
  }
});

export default router;
