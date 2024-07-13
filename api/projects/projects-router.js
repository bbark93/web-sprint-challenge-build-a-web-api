// Write your "projects" router here!
const express = require("express");
const { validateProjectId, validateProject } = require("./projects-middleware");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Projects.insert({
    name: req.name,
    description: req.description,
    completed: req.completed,
  })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Projects.update(req.params.id, { name: req.name, description: req.description, completed: req.completed })
    .then(() => {
      return Projects.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    console.log(req.user);
    try {
      await Projects.remove(req.params.id)
      res.json(req.user)
    } catch (err) {
      next(err)
    }
  });

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "somthing tragic inside posts router happened",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
