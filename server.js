const express = require('express');
const projectRouter = require('./projectRouter');

const server = express();

server.use(express.json());
server.use("/project", projectRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome! Let's work on some projects!"})
});

module.exports = server;