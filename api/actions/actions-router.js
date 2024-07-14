// Write your "actions" router here!
const express = require("express");
const { validateActiontId } = require('./actions-middlware');

const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
    Actions.get()
      .then((actions) => {
        res.json(actions);
      })
      .catch(next);
  });

  router.get("/:id", validateActiontId, (req, res) => {
    res.json(req.action);
  });

  router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: "somthing tragic inside actions router happened",
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = router;