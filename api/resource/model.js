// build your `Resource` model here
const db = require("../../data/dbConfig");

function getAll() {
  return db("resources");
}

function getById(resource_id) {
  return db("resources").where("resource_id", resource_id).first();
}

function getByName(resource_name) {
  return db("resources").where("resource_name", resource_name).first();
}

async function insert(project) {
  const [resource_id] = await db("resources").insert(project);
  return getById(resource_id);
}

module.exports = { getAll, insert, getByName };
