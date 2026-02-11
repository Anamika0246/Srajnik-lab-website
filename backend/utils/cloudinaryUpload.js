import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, folder = 'srajnik-lab') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe to cloudinary
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise<Object>} - Cloudinary delete result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {String} url - Cloudinary URL
 * @returns {String} - Public ID
 */
export const extractPublicId = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  
  if (uploadIndex === -1) {
    return null;
  }
  
  // Get everything after 'upload' and version (if exists)
  const pathParts = parts.slice(uploadIndex + 1);
  
  // Remove version number (v1234567890) if exists
  const cleanParts = pathParts.filter(part => !part.match(/^v\d+$/));
  
  // Join remaining parts and remove file extension
  const publicId = cleanParts.join('/').replace(/\.[^/.]+$/, '');
  
  return publicId;
};
