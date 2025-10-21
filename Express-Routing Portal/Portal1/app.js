const express = require("express")
const app = express();
const path = require("path")


app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000")
})

app.get("/service",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages',"services.html"))
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"pages","contact.html"))
})
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','about.html'))
})
app.get("/",(req,res)=>{
    res.send("This is Home Page")
})