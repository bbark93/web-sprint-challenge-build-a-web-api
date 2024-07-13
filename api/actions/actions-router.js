// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

const router = express.Router();

router.get("/actions", (req, res, next) => {
    Actions.get()
      .then((actions) => {
        res.json(actions);
      })
      .catch(next);
  });

  router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: "somthing tragic inside actions router happened",
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = router;