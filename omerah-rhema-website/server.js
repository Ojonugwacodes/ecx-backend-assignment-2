require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = (req.url == "/")
    ? path.join(__dirname, "public", "index.html")
    : path.join(__dirname,"public", req.url);

    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
        case ".css" : contentType = "text/css"; break;
        case ".js" : contentType = "text/js"; break;
        case ".json" : contentType = "application/json"; break;
        case ".png" : contentType = "image/png"; break;
        case ".jpg" : contentType = "image/jpg"; break;
    }
    fs.readFile(filePath, (err, content)=> {
        if (err) {
            if (err.code == "ENOENT") {
                fs.readFile(path.join(__dirname, "public", "./404.html"), (err, notFoundContent)=> {
                    res.writeHead(404, {"Content-Type": "text/html"});
                    res.end(notFoundContent || "<h1>404 -- Page NOT FOUND </h1>")
                })
            } else {
                res.writeHead(500);
                res.end("Server Error");
            }
        }else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content);
        }
    })

});

const PORT = process.env.PORT || 7000;
const PASSWORD = process.env.PASSWORD;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Essentials Recap

// Import modules: http, fs, path

// Create server: http.createServer()

// Determine file path: check req.url

// Set content type: based on file extension

// Read file & handle errors: serve file, 404, or 500

// Start server: server.listen(PORT)