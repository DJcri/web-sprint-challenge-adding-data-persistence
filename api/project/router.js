// build your `/api/projects` router here
const express = require("express");
const Project = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.getAll();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { project_name } = req.body;
    if (project_name) {
      const project = await Project.insert(req.body);
      res.status(201).json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.use("/", (err, req, res) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
