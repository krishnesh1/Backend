const express = require('express');
const app = express();
const session = require('express-session');

const user = require('./user.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}))

const isAuthenticated = (req, res, next) => {
    if(req.session.foundUser){
        next();
    }else{
        res.redirect('/login');
    }
}

const isAuthorised =(req,res,next)=>{
    if(req.session.foundUser && req.session.foundUser.role === 'admin'){
        next();
    }else{
        res.send('You are not authorised to access this resource');
    }
}

app.post("/login",(req,res)=>{
    
    const {username,password}=req.body;

    const foundUser=user.find(u=>u.username===username && u.password===password);

    if(!foundUser){
        return res.status(401).send("Invalid username or password");
    }

    req.session.foundUser={
        username:foundUser.username,
        role:foundUser.role,
        loginAt: new Date().toISOString()
    }

    if(foundUser.role==="admin"){
        return res.redirect('/admin');
    }else{
        return res.redirect('/user');
    }
  
})

app.get("/login",(req,res)=>{
    res.sendFile('login.html',{root:'./UI'});
})

app.get("/admin",isAuthenticated,isAuthorised,(req,res)=>{

    res.sendFile('admin.html',{root:'./UI'});
})

app.get("/user",isAuthenticated,(req,res)=>{

    res.sendFile('user.html',{root:'./UI'});
})