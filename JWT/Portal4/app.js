const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const users = require("../user.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET = "krishnesh";
app.listen(3000, () => {
  console.log("server satarted");
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./UI" });
});

let activeTokens = [];
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (x) => x.username === username && x.password === password
  );

  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 30 * 60 * 1000);

  if (!user) {
    res.status(500).send("Invalid username and password");
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      login: issuedAt.toISOString(),
    },
    SECRET,
    { expiresIn: "30m" }
  );

  activeTokens.push({
        username:user.username,
        token,
        issuedAt,
        expiresAt
    });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  if (user.role === "admin") {
    return res.redirect("/admindashboard");
  } else {
    return res.redirect("/userdashboard");
  }
});

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send(" Please login first.");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {
      res.clearCookie("token"); // remove expired token
      return res.redirect(
        "/login?message= Session expired, please login again"
      );
    }
    if (err) {
      return res.status(401).send("❌ Invalid token");
    }
    req.user = decoded; // store decoded info
    next();
  });
}

app.get("/admindashboard", verifyToken, (req, res) => {
  res.sendFile("admin.html", { root: "./UI" });
});

app.get("/userdashboard", verifyToken, (req, res) => {
  res.sendFile("user.html", { root: "./UI" });
});
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.get("/api/active-tokens", verifyToken, (req,res)=>{
    if(req.user.role !== "admin") return res.status(403).send("Forbidden");
    res.json(activeTokens);
});