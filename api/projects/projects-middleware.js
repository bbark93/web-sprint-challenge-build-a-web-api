// add middlewares here related to projects
const Projects = require("./projects-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timeStamp}] ${method} to ${url}`);
  next();
}

async function validateProjectId(req, res, next) {
    try {
      const project = await Projects.get(req.params.id)
      if (!project) {
        next({ status: 404, message: 'project not found' })
      }else {
        req.project = project
        next()
      }
    } catch (err) {
      res.status(500).json({
        message: 'problem finding project'
      })
    }
  }

module.exports = {
    logger,
    validateProjectId
  }