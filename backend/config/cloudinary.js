const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Note: Ensure dotenv config is called before requiring this file, or call it here
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'test',
    api_key: process.env.CLOUDINARY_API_KEY || 'test',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'test'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pract7_uploads',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

module.exports = { cloudinary, storage };
