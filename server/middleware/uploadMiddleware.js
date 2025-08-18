const multer = require('multer'); // Corrected this line
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // The 'uploads' folder should be in your server's root directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename to prevent overwriting
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;