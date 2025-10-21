const express = require('express');
const app = express();
const session = require('express-session');
const users = require('./user.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});

app.use(session({
    secret:"secret-key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge: 30*60*1000,
        secure: false
    }
}))


app.get("/login",(req,res)=>{
    res.sendFile('login.html',{root:'./ui'});
})

app.post("/login",(req,res)=>{
    const {username,password} = req.body;

    const user = users.find(x=>x.username===username && x.password===password);
    if(!user){
        return res.status(401).send("Invalid username or password");
    }
    req.session.user = user;
    if(user.role === "admin"){
        res.redirect("/admin");
    }else{
        res.redirect("/profile");
    }
})
const isAuthenticated = (req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.redirect("/login");
    }
}

const isAuthorised = (req,res,next)=>{
    if(req.session.user && req.session.user.role === 'admin'){
        next();
    }else{
        res.send("Access Denied: Admins only");
    }
}
app.get("/admin",isAuthenticated,isAuthorised,(req,res)=>{
    res.sendFile('admin.html',{root:'./ui'});
})

app.get("/profile",isAuthenticated,(req,res)=>{
    res.sendFile('profile.html',{root:'./ui'});
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.clearCookie("connect.sid"); 
        res.redirect("/login");
    });
});
