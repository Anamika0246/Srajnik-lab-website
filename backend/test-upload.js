import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test image upload
async function testUpload() {
  try {
    // First login to get token
    console.log('Logging in...');
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@test.com', // Change to your admin email
      password: 'admin123' // Change to your admin password
    });

    const token = loginRes.data.token;
    console.log('✓ Login successful, token received');

    // Create a simple test image buffer
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    if (!fs.existsSync(testImagePath)) {
      console.log('⚠ test-image.jpg not found, creating a dummy file');
      // Create a minimal valid JPEG file (1x1 pixel red image)
      const minJpeg = Buffer.from([
        0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
        0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
        0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
        0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
        0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
        0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
        0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
        0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
        0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x03, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00,
        0x3F, 0x00, 0x00, 0x7F, 0xFF, 0xD9
      ]);
      fs.writeFileSync(testImagePath, minJpeg);
    }

    // Upload the image
    console.log('Uploading test image...');
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath));
    formData.append('folder', 'srajnik-lab/test');

    const uploadRes = await axios.post(
      'http://localhost:5000/api/upload/image',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log('✓ Upload successful!');
    console.log('Response:', uploadRes.data);
  } catch (error) {
    console.error('✗ Upload failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testUpload();
