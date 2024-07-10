const express = require("express");
const { logger } = require('./projects/projects-middleware');
const server = express();
const projectRouter = require("./projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use(logger);

server.use("/api/projects", projectRouter);

module.exports = server;
