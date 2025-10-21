const http = require("http");
const path = require("path");
const fs = require("fs");

const pathName = path.join(__dirname,"public");

const server = http.createServer((req,res)=>{

    const filePath = path.join(pathName,req.url.replace("/public/", ""));
    const extName = path.extname(filePath).toLowerCase();

    let contenType = "application/octet-stream";

    switch(extName){
        case ".html": 
            contenType="text/html";
            break;
        case ".txt":
            contenType="text/plain";
            break;
        case ".js":
            contenType="application/javascript";
            break;
        case ".jpg":
        case ".jpeg":
            contenType="image/jpeg";
            break;
        case ".png":
            contenType="image/png";
            break;
        case ".css":
            contenType="text/css";
            break;

        

    }

    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.end("404 not found");
        }else{
            res.setHeader("Content-Type",contenType);
            res.end(data);
        }
    })
})

server.listen(3000,()=>{
    console.log("Server started at 3000")
})