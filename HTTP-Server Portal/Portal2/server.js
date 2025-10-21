const http = require('http');

let notes = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Handle POST /notes
    if (method === 'POST' && url === '/notes') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (!data.note || typeof data.note !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Invalid JSON: must contain 'note' as a string" }));
                    return;
                }

                notes.push(data.note);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Note added", notes }));

            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid JSON format" }));
            }
        });

        return;
    }

    // Handle GET /notes
    if (method === 'GET' && url === '/notes') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ notes }));
        return;
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
