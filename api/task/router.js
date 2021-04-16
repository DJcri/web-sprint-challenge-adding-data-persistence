// build your `/api/tasks` router here
const express = require("express");
const Project = require("../project/model");
const Task = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { task_description, project_id } = req.body;
    if (task_description && project_id) {
      const project = await Project.getById(project_id);
      if (project) {
        const task = await Task.insert(req.body);
        res.status(201).json(task);
      } else {
        res.status(400).json(`project with id ${project_id} doesn't exist`);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.use("/", (err, req, res) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
