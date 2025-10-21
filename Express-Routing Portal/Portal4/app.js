const express = require("express")
const app = express();
const path = require("path")

app.listen(3000);

function getGreeting(lang){
    switch(lang){
        case 'en':
            return "hello"; 
            break;
        case 'fr':
            return "Bonjour";
            break;
        case 'hi':
            return "Namaste";
            break;
        default:
            return "Hello"

    }
}

app.get("/",(req,res)=>{
    res.send("Welcome to Greeting")
})
app.get("/greet",(req,res)=>{
    const {lang="en"}= req.query
    // console.log(lang[0])
    // console.log(lang[1])
    res.send(getGreeting(lang))
})