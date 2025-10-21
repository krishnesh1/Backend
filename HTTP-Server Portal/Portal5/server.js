const http = require("http");

http.createServer((req,res)=>{

if(req.url==="/time-check"){
    const hour = new Date().getHours();
    if(hour<12){
        res.writeHead(302,{location: "/morning"});
        res.end();
    }
    else{
        res.writeHead(302,{location:"/evening"});
        res.end();
    }


}
else if(req.url==="/morning"){
    res.end("Good Morning");
}else if(req.url==="/evening"){
    res.end("Good Evening");
}
else{
    res.write("404 Error");
    res.end();
}

}).listen(3000,()=>{
    console.log("server started at 3000");
})