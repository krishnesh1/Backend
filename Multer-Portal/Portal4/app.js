const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve static HTML form
app.get("/", (req, res) => {
    res.sendFile("form.html", { root: __dirname });
});

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "uploads/products");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg and .png files are allowed"));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: fileFilter
});

// Upload route
app.post("/upload", upload.single("productImage"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    res.send(`
        <h3>Upload Successful!</h3>
        <p>File path: ${req.file.path}</p>
        <p>File size: ${req.file.size} bytes</p>
        <a href="/">Upload another file</a>
    `);
});

// Error handler
app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File size exceeds 2 MB");
    }
    if (err.message) {
        return res.status(400).send(err.message);
    }
    next(err);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
