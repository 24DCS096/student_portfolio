const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize the express app
const app = express();
const port = 3000;

// Setup file storage using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.static('uploads'));

// Endpoint to handle file uploads
app.post('/upload', upload.single('fileUpload'), (req, res) => {
    if (req.file) {
        res.send(`File uploaded successfully: <a href="/${req.file.filename}" target="_blank">${req.file.filename}</a>`);
    } else {
        res.send('Please select a file to upload.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
