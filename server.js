const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize the express app
const app = express();
const port = process.env.PORT || 3000; // Use Render's dynamically assigned port or fallback to 3000 for local development

// Setup file storage using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for file uploads
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Define the filename pattern
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS) from 'public' directory
app.use(express.static('public'));

// Serve uploaded files from 'uploads' directory
app.use(express.static('uploads'));

// Serve the homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the 'index.html' file from the root directory
});

// Endpoint to handle file uploads
app.post('/upload', upload.single('fileUpload'), (req, res) => {
    if (req.file) {
        // If file is uploaded, send success message with link to the uploaded file
        res.send(`File uploaded successfully: <a href="/${req.file.filename}" target="_blank">${req.file.filename}</a>`);
    } else {
        // If no file is uploaded, send a message
        res.send('Please select a file to upload.');
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
