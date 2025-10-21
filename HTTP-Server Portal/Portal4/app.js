const http = require("http");
const url = require("url");

http.createServer((req,res)=>{
    if(req.url.startsWith("/greet")){
        let parsedUrl = url.parse(req.url,true);
        let  name = parsedUrl.query.name || "Guest";

        res.setHeader('Content-Type','text/plain');
        res.end(`Hello, ${name}`);
    }
}).listen(4000,()=>{
    console.log("Server started at 4000");
})