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
    console.log('id = ', req.params.id);
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

  function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description) {
      res.status(400).json({
        message: 'missing required name and description field',
      })
    }else {
      req.name = name
      req.description = description
      req.completed = completed
      next()
    }
  }

module.exports = {
    logger,
    validateProjectId,
    validateProject
  }