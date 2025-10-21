const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const users = require("../user.json");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const SECRET = "your-secret-key";

let secretKey = "krishnesh";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (x) => x.username === username && x.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  const payload = {
    username: user.username,
    role: user.role,
    login: new Date().toISOString(),
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000,
  });

  if (user.role == "admin") {
    return res.redirect("/admindashboard");
  } else {
    return res.redirect("/userdashboard");
  }
});

function authenticateToken(role=null){
    return  (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    if (role && decoded.role !== role) {
      return res.status(403).send(` Access denied: ${role}s only`);
    }
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
};
} 


app.get("/login", (req, res) => {
  res.sendFile("loginform.html", { root: "./UI" });
});

app.get("/admindashboard", authenticateToken("admin"), (req, res) => {
  res.sendFile("adminhome.html", { root: "./UI" });
});

app.get("/userdashboard", authenticateToken("user"), (req, res) => {
  res.sendFile("userhome.html", { root: "./UI" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
