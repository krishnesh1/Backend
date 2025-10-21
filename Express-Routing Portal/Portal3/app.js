const express = require("express")
const app = express();
const path = require("path");
const fs = require("fs")

app.listen(3000);

app.use(express.static(path.join(__dirname,'public')))

app.get("/home",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"))
})