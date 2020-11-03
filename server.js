const express = require('express');
const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

const server = express();

server.use(express.json());
server.use("/project", projectRouter);
server.use("/action", actionRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome! Let's work on some projects!"})
});

module.exports = server;