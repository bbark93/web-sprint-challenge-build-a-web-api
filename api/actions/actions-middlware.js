// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActiontId(req, res, next) {
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

  module.exports = {
    validateActiontId
  }