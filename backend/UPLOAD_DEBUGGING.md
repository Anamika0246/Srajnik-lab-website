# Upload Error Debugging Guide

## Issues Fixed

### 1. Authentication Middleware Bug (CRITICAL)
**Problem**: The `protect` middleware was sending two responses - one for success and one for missing token, even when token existed.
**Fix**: Added `return` statements and `else` clause to ensure only one response is sent.

### 2. CORS Configuration
**Problem**: Default CORS settings don't explicitly allow file uploads or specify allowed origins.
**Fix**: Added explicit CORS configuration with:
- Allowed origins (localhost:5173, localhost:3000)
- Allowed headers (Content-Type, Authorization)
- Increased payload size limit to 10mb

### 3. Stream Error Handling
**Problem**: No error event listeners on the upload stream.
**Fix**: Added error event listeners for both readable stream and upload stream.

## Testing the Upload

### 1. Restart the Backend Server
```bash
cd backend
npm start
```

### 2. Check Cloudinary Configuration on Startup
You should see in the console:
```
Cloudinary config: {
  cloud_name: 'dumvulyry',
  api_key: 'SET',
  api_secret: 'SET'
}
```

### 3. Test Upload from Frontend
- Login to admin dashboard
- Try uploading an image in any section (Projects, Events, Gallery, Team)
- Check browser console (F12) for any errors
- Check backend terminal for detailed logs

## Expected Console Logs (Success)

### Backend logs when upload succeeds:
```
Upload request received
File: Present
Body: { folder: 'srajnik-lab/projects' }
Uploading to folder: srajnik-lab/projects
File buffer size: 123456
Starting Cloudinary upload to folder: srajnik-lab/projects
Buffer size: 123456 bytes
Cloudinary upload stream success
Upload successful: https://res.cloudinary.com/...
```

## Common Error Scenarios

### "Not authorized, no token"
- User not logged in
- Token expired (happens after 30 days)
- Token not being sent from frontend
**Solution**: Logout and login again

### "Only image files are allowed"
- Trying to upload non-image files
**Solution**: Only use jpeg, jpg, png, gif, or webp files

### "File too large"
- Image larger than 5MB
**Solution**: Compress image before upload

### "Cloudinary upload stream error"
- Invalid Cloudinary credentials
- Network issues
- Cloudinary service down
**Solution**: 
1. Verify .env credentials
2. Check internet connection
3. Check Cloudinary dashboard

## Checking Logs

### View detailed error logs:
All upload errors are logged with this format in the backend console:
```
========== UPLOAD ERROR ==========
Error name: [error name]
Error message: [detailed message]
Error stack: [stack trace]
Full error: [complete error object]
==================================
```

## Verifying Cloudinary Setup

1. Login to Cloudinary dashboard: https://console.cloudinary.com/
2. Go to Media Library
3. Check if folders exist:
   - srajnik-lab/projects
   - srajnik-lab/events
   - srajnik-lab/gallery
   - srajnik-lab/team

## Next Steps if Still Failing

1. **Check browser console (F12)** for frontend errors
2. **Check backend terminal** for detailed error logs
3. **Test Cloudinary credentials** by running:
   ```bash
   cd backend
   node -e "require('dotenv').config(); console.log(process.env.CLOUDINARY_CLOUD_NAME)"
   ```
4. **Verify token is being sent** - In browser Network tab, check the upload request headers for "Authorization: Bearer [token]"

## Quick Test

Run this test from backend directory to verify Cloudinary works:
```bash
node -e "
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('Config:', cloudinary.config());
"
```
