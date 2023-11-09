module.exports = (app) => {
  const requests = require("../controllers/request.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Request for a Student
  router.post("/", [authenticate], requests.create);

  // Retrive all Requests
  router.get("/", [authenticate], requests.findAll);

  // Retrieve all Requests for a Student
  /*router.get(
    "/",
    [authenticate],
    requests.findAllForStudent
  );*/

  // Retrieve a single Request with id
  router.get("/:id", [authenticate], requests.findOne);

  // Update a Lesson with id
  router.put("/:id", [authenticate], requests.update);

  // Delete a Lesson with id
  router.delete("/:id", [authenticate], requests.delete);

  // Delete all Lessons
  router.delete("/:id", [authenticate], requests.deleteAll);

  app.use("/accommodations-t5/requests", router);
};
