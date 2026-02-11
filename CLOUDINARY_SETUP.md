# Cloudinary Setup Guide for Srajnik Lab Website

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up with your email
3. Verify your email address
4. Complete the setup wizard

## Step 2: Get Your Cloudinary Credentials

1. After login, go to **Dashboard** (https://console.cloudinary.com/)
2. You'll see your credentials:
   - **Cloud Name**: (e.g., `dxyz123abc`)
   - **API Key**: (e.g., `123456789012345`)
   - **API Secret**: Click on "API Secret" to reveal it

## Step 3: Update .env File

Open `backend/.env` and replace these values:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Example:
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

## Step 4: Cloudinary Folder Structure

Images will be organized automatically in these folders:
- `srajnik-lab/projects` - Project images
- `srajnik-lab/events` - Event images
- `srajnik-lab/gallery` - Gallery images
- `srajnik-lab/general` - Other images

## Step 5: How to Upload Images

### From Admin Dashboard

The admin dashboard now has image upload functionality:

1. **Add Project**: Upload project image when creating/editing projects
2. **Add Event**: Upload event banner when creating/editing events
3. **Add Gallery Image**: Upload images to the gallery

### API Endpoints

**Upload Single Image:**
```javascript
POST /api/upload/image
Headers: Authorization: Bearer <token>
Body: FormData with 'image' file and optional 'folder' field
```

**Upload Multiple Images:**
```javascript
POST /api/upload/images
Headers: Authorization: Bearer <token>
Body: FormData with 'images' files (max 10) and optional 'folder' field
```

### Example Usage in Frontend

```javascript
const uploadImage = async (file, folder = 'srajnik-lab/general') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  const response = await axios.post(
    'http://localhost:5000/api/upload/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`
      }
    }
  );

  return response.data.url; // Cloudinary URL
};
```

## Features Implemented

✅ **Automatic Image Optimization**
- Images resized to max 1200x800px
- Quality automatically optimized
- Auto-format conversion (WebP when supported)

✅ **File Validation**
- Only image files allowed (jpeg, jpg, png, gif, webp)
- Max file size: 5MB per image

✅ **Organized Storage**
- Folder-based organization
- Automatic public ID generation
- Easy to manage in Cloudinary dashboard

✅ **Secure Upload**
- Protected endpoints (login required)
- Only authenticated users can upload

## Image Size Limits

- **Single file**: 5MB max
- **Multiple files**: Up to 10 images at once
- **Optimized output**: Max 1200x800px

## Cloudinary Dashboard

Access your images at: https://console.cloudinary.com/console/media_library

You can:
- View all uploaded images
- Organize into folders
- Delete unwanted images
- Get image URLs
- See usage statistics

## Free Tier Limits

Cloudinary free plan includes:
- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25,000/month

This is more than enough for the lab website!

## Troubleshooting

**Upload fails with 401 error:**
- Check if user is logged in
- Verify token in Authorization header

**Upload fails with 400 error:**
- Ensure file is an image type
- Check file size < 5MB

**Images not appearing:**
- Verify Cloudinary credentials in .env
- Check network tab for actual URL returned
- Ensure backend server restarted after .env changes

## Next Steps

1. Update .env with your Cloudinary credentials
2. Restart the backend server
3. Test image upload from admin dashboard
4. Images will automatically be stored in Cloudinary!
