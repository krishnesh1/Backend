const http = require("http");
const fs = require("fs");
const url = require("url")



const moives = JSON.parse(fs.readFileSync("movie.json","utf-8"))

http.createServer((req,res)=>{

    if(req.url.startsWith("/movies")){
        let parsedUrl = url.parse(req.url,true);
        let genre = parsedUrl.query.genre;
        let yearparam = parsedUrl.query.year;

        if (!genre || !yearparam){
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message:"Bothn 'genre' and 'year' area required",
                data:[]
            }))
            return;
        }
        const year = yearparam.split(',').map(x=>parseInt(x.trim()));

        const filtered = moives.filter(moive=>
            moive.genre.toLowerCase() === genre.toLowerCase() && year.includes(moive.year)
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filtered));
    }else{
        res.end(JSON.stringify({message: "Not Found"}));
    }
}).listen(3000,()=>{
    console.log("server started at 3000");
})