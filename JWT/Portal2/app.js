const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const users = require("../user.json"); // your user.json file

const app = express();
const secretKey = "krishnesh";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function authenticateToken(role = null) {
    return (req, res, next) => {
        const token = req.cookies?.token;
        if (!token) return res.redirect("/login");

        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;

            if (role && decoded.role !== role) {
                return res.status(403).send(`❌ Access denied: ${role}s only`);
            }

            next();
        } catch (err) {
            return res.redirect("/login");
        }
    };
}


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./UI/loginform.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        x => x.username === username && x.password === password
    );

    if (!user) return res.status(401).send("❌ Invalid username or password");

    const payload = {
        username: user.username,
        role: user.role,
        login: new Date().toISOString()
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    if (user.role === "admin") return res.redirect("/admindashboard");
    return res.redirect("/userdashboard");
});

app.get("/admindashboard", authenticateToken("admin"), (req, res) => {
    res.sendFile(path.join(__dirname, "./UI/adminhome.html"));
});

app.get("/userdashboard", authenticateToken("user"), (req, res) => {
    res.sendFile(path.join(__dirname, "./UI/userhome.html"));
});

app.get("/profile", authenticateToken(), (req, res) => {
    const { username, login } = req.user;
    const token = req.cookies.token;
    console.log(login);

    const loginTime = new Date(login);
    const diffMs = new Date() - loginTime;
    const diffMinutes = Math.floor(diffMs / 60000);

    res.send(`
        <h1>Profile Page</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Time since login:</strong> ${diffMinutes} minute(s)</p>
        <p><strong>JWT Token:</strong> ${token}</p>
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    `);
});

// Logout route
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
