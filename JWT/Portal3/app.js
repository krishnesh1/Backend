const express = require("express");
const app = express();

const  cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const users = require("../user.json");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const SECRET = "krishnesh";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/login",(req,res)=>{
    res.sendFile("loginform.html",{root:"./UI"});
})

app.post("/login",(req,res)=>{
    const {username,password} = req.body;

    const user = users.find(x=>x.username===username && x.password===password);
    if(!user){
        return res.status(401).send("❌ Invalid username or password");
    }

    const token = jwt.sign({
        username: user.username,
        role: user.role,
        login: new Date().toISOString()
    },SECRET,{expiresIn:'30s'})
    
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge: 30*60*1000 // 30 minutes
    })

    if(user.role==="admin"){
        return res.redirect("/admindashboard");
    }else{
        return res.redirect("/userdashboard");
    }
})
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send(" Please login first.");
  }

  jwt.verify(token, SECRET, (err, decoded) => {

    if (err && err.name === "TokenExpiredError") {
      res.clearCookie("token"); // remove expired token
      return res.redirect("/login?message= Session expired, please login again");
    }
    if (err) {
      return res.status(401).send("❌ Invalid token");
    }
    req.user = decoded; // store decoded info
    next();
  });
}

app.get("/admindashboard",verifyToken,(req,res)=>{
    res.sendFile("admin.html",{root:"./UI"})
})

app.get("/userdashboard",verifyToken,(req,res)=>{
    res.sendFile("user.html",{root:"./UI"})
})

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
})