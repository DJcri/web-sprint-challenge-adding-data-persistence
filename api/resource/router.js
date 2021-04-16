// build your `/api/resources` router here
const express = require("express");
const Resource = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resource.getAll();
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { resource_name } = req.body;
    if (resource_name) {
      const existing = await Resource.getByName(resource_name);
      if (!existing) {
        const resource = await Resource.insert(req.body);
        res.status(201).json(resource);
      } else {
        res
          .status(400)
          .json(`resource with name ${resource_name} already exists`);
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
