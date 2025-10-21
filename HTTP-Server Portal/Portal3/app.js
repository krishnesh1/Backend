const http = require("http");
const path = require("path");
const fs = require("fs");
const queryString = require("querystring")

const server = http.createServer((req,res)=>{

    if(req.url=="/" && req.method=="GET"){
       let data = fs.readFileSync("form.html", "utf-8");
       res.write(data);
       res.end();
    }
    else if(req.url=='/submit' && req.method=="POST"){
        let body = "";
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        })
        req.on('end',()=>{
            let userData =queryString.parse(body);
            let userName = userData.name || ""
            let userEmail = userData.email || "";

            return res.end(`Thank, you, ${userName}.Your email is ${userEmail}`);
        })
    }else{
        res.end("user not found");
    }
})

server.listen(3000,()=>{
    console.log("server started");
})