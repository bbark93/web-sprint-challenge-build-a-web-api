// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req, res, next) {
    try {
      const action = await Actions.get(req.params.id)
      if (!action) {
        next({ status: 404, message: 'action not found' })
      }else {
        req.action = action;
        next()
      }
    } catch (err) {
      res.status(500).json({
        message: 'problem finding action'
      })
    }
  }

  async function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body

    try {
       const project = await Projects.get(project_id) 
       if (!project) {
            next({ status: 404, message: `project ${project_id} doesn't exist`})
       }else {
        if (!description || !notes) {
            res.status(400).json({
              message: 'missing required description and notes field',
            })
          }else {
            req.project_id = project_id
            req.description = description
            req.notes = notes
            req.completed = completed
            next()
          }
       }
    } catch (err) {
        res.status(500).json({
            message: 'problem validating action'
          })
    }
  }

  module.exports = {
    validateActionId,
    validateAction
  }