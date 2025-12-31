require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {



});

const PORT = process.env.PORT || 7000;
const PASSWORD = process.env.PASSWORD;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})