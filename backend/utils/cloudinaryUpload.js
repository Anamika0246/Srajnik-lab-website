import cloudinary from '../config/cloudinary.js';

console.log('Cloudinary config:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? 'SET' : 'NOT SET',
  api_secret: cloudinary.config().api_secret ? 'SET' : 'NOT SET'
});

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = async (fileBuffer, folder = 'srajnik-lab') => {
  try {
    console.log('Starting Cloudinary upload to folder:', folder);
    console.log('Buffer size:', fileBuffer.length, 'bytes');
    console.log('Buffer type:', typeof fileBuffer, 'Is Buffer:', Buffer.isBuffer(fileBuffer));
    
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('Invalid file buffer');
    }

    // Detect MIME type from buffer
    let mimeType = 'image/jpeg'; // default
    if (fileBuffer[0] === 0x89 && fileBuffer[1] === 0x50) {
      mimeType = 'image/png';
    } else if (fileBuffer[0] === 0x47 && fileBuffer[1] === 0x49) {
      mimeType = 'image/gif';
    } else if (fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8) {
      mimeType = 'image/jpeg';
    } else if (fileBuffer[0] === 0x52 && fileBuffer[1] === 0x49 && 
               fileBuffer[2] === 0x46 && fileBuffer[3] === 0x46) {
      // RIFF header - check for WEBP
      if (fileBuffer[8] === 0x57 && fileBuffer[9] === 0x45 && 
          fileBuffer[10] === 0x42 && fileBuffer[11] === 0x50) {
        mimeType = 'image/webp';
      }
    }

    // Convert buffer to base64 data URI
    const base64Image = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    
    console.log('Detected MIME type:', mimeType);
    console.log('Uploading to Cloudinary...');
    
    // Upload using base64
    // Note: Transformation removed since images are pre-optimized with sharp
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: 'auto'
    });

    console.log('Cloudinary upload success!');
    console.log('Uploaded URL:', result.secure_url);
    
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      http_code: error.http_code
    });
    throw error;
  }
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
