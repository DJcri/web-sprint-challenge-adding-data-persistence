// build your `Project` model here
const db = require("../../data/dbConfig");

function getAll() {
  return db("projects");
}

function getById(project_id) {
  return db("projects").where("project_id", project_id).first();
}

async function insert(project) {
  const [project_id] = await db("projects").insert(project);
  return getById(project_id);
}

module.exports = { getAll, insert, getById };
