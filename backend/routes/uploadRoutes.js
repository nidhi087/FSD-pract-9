const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ storage });

// Single image upload route
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        imageUrl: req.file.path // Cloudinary URL
    });
});

module.exports = router;
