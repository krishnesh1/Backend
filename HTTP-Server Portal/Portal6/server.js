const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/data.html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hello from HTML!</h1><p>This is HTML content.</p>");
    }
    else if (req.url === "/data.txt") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from plain text!");
    }
    else if (req.url === "/data.json") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello from JSON!" }));
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
