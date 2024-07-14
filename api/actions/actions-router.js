// Write your "actions" router here!
const express = require("express");
const { validateActionId, validateAction } = require('./actions-middlware');

const Actions = require("./actions-model");
const Projects = require('../projects/projects-model');

const router = express.Router();

router.get("/", (req, res, next) => {
    Actions.get()
      .then((actions) => {
        res.json(actions);
      })
      .catch(next);
  });

  router.get("/:id", validateActionId, (req, res) => {
    res.json(req.action);
  });

//   router.post("/", validateAction, (req, res, next) => {
//     // RETURN THE NEWLY CREATED USER OBJECT
//     Actions.insert({
//       project_id: req.project_id,
//       description: req.description,
//       notes: req.notes,
//       completed: req.completed,
//     })
//       .then((newAction) => {
//         res.status(201).json(newAction);
//       })
//       .catch(next);
//   });

router.delete('/:id', validateActionId, async (req, res, next) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    try {
      await Actions.remove(req.params.id)
      res.json(req.action)
    } catch (err) {
      next(err)
    }
  });

  router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: "somthing tragic inside actions router happened",
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = router;