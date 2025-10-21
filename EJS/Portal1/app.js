const express = require("express");
const app = express();

app.set("view engine","ejs");


app.listen(3000,()=>{
    console.log("server started at 3000");
})

app.get("/greeting",(req,res)=>{
    const userName = "John";
    const isLoggedin = true;

    res.render("greeting",{userName:userName,isLoggedin:isLoggedin});
})