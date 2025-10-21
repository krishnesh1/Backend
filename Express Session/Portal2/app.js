const express = require('express');
const app = express();
const session = require('express-session');
const users = require('./user.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})

app.get("/login",(req,res)=>{
    res.sendFile('login.html',{root:'./ui'});
})

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}))

const isAuthenticated = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');

    }
}

const isAuthorised = (req,res,next)=>{
    if(req.session.user && req.session.user.role === 'admin'){
        next();
    }else{
        res.send("Access Denied: Admins only");
    }
}

app.post("/login",(req,res)=>{
    const {username,password}=req.body;

    const user = users.find(u=>u.username===username && u.password===password);

    if(!user){
        return res.status(401).send("Invalid username or password");
    }
    req.session.user = user;
      if (user.role === "admin") {
        res.redirect("/admin");
    } else {
        res.redirect("/profile");
    }
})

app.get("/profile", isAuthenticated, (req, res) => {
    res.sendFile('profile.html', { root: './ui' });
});

app.get("/admin", isAuthenticated, isAuthorised, (req, res) => {
    res.sendFile('admin.html', { root: './ui' });
   
});