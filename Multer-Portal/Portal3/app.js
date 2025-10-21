const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
    console.log("server started at 3000");
});

app.get("/", (req, res) => {
    res.sendFile("form.html", { root: "./" });
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumes"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /pdf/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


app.post("/upload", upload.single("resume"), (req, res) => {
    const { name, email, phone } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "Resume file is required" });
    }

    const newUser = {
        name,
        email,
        phone,
        resumePath: req.file.path
    };

    let users = [];
    try {
        const data = fs.readFileSync("user.json");
        users = JSON.parse(data);
    } catch (err) {
        users = []; 
    }

    users.push(newUser);

    fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

    res.json({
        message: "Upload success ",
        user: newUser
    });
});
