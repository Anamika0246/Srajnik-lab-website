import express from 'express';
import sharp from 'sharp';
import upload from '../middleware/upload.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File size exceeds the 20MB limit',
        error: 'FILE_TOO_LARGE'
      });
    }
    if (err.message.includes('Only image files are allowed')) {
      return res.status(400).json({ 
        message: err.message,
        error: 'INVALID_FILE_TYPE'
      });
    }
    return res.status(400).json({ 
      message: err.message || 'File upload error',
      error: 'UPLOAD_ERROR'
    });
  }
  next();
};

// Upload single image
router.post('/image', protect, upload.single('image'), handleMulterError, async (req, res) => {
  try {
    console.log('\n========== UPLOAD REQUEST ==========');
    console.log('Upload request received');
    console.log('User:', req.user ? req.user.email : 'No user');
    console.log('File:', req.file ? 'Present' : 'Missing');
    console.log('Body:', req.body);
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folder = req.body.folder || 'srajnik-lab/general';
    const originalSize = req.file.buffer.length;
    console.log('Original file size:', (originalSize / 1024).toFixed(2), 'KB');
    
    // Compress and optimize image using sharp
    let compressedBuffer;
    try {
      compressedBuffer = await sharp(req.file.buffer)
        .resize(1600, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 75 })
        .toBuffer();
      
      const compressedSize = compressedBuffer.length;
      const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);
      
      console.log('Compressed file size:', (compressedSize / 1024).toFixed(2), 'KB');
      console.log('Compression ratio:', compressionRatio + '%');
      console.log('Uploading to Cloudinary folder:', folder);
    } catch (compressionError) {
      console.error('Image compression failed:', compressionError);
      return res.status(500).json({ 
        message: 'Image compression failed',
        error: compressionError.message 
      });
    }
    
    const result = await uploadToCloudinary(compressedBuffer, folder);
    
    console.log('Upload successful:', result.secure_url);
    console.log('====================================\n');

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    console.error('\n========== UPLOAD ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    if (error.http_code) {
      console.error('Cloudinary HTTP Code:', error.http_code);
    }
    console.error('Full error:', error);
    console.error('==================================\n');
    res.status(500).json({ 
      message: error.message || 'Upload failed',
      error: error.name,
      details: error.toString(),
      cloudinaryError: error.http_code || null
    });
  }
});

// Upload multiple images
router.post('/images', protect, upload.array('images', 10), handleMulterError, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const folder = req.body.folder || 'srajnik-lab/general';
    
    // Compress each image before uploading
    const uploadPromises = req.files.map(async (file) => {
      try {
        const compressedBuffer = await sharp(file.buffer)
          .resize(1600, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 75 })
          .toBuffer();
        
        return uploadToCloudinary(compressedBuffer, folder);
      } catch (compressionError) {
        throw new Error(`Failed to compress ${file.originalname}: ${compressionError.message}`);
      }
    });

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
