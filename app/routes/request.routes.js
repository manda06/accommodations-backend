module.exports = (app) => {
  const requests = require("../controllers/request.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Request for a Student
  router.post("/:studentId/requests/", [authenticate], requests.create);

  // Retrive all Requests
  router.get("/", [authenticate], requests.findAll);

  // Retrieve all Requests for a Student
  router.get(
    "/:studentId/requests/",
    [authenticate],
    requests.findAllForStudent
  );

  // Retrieve a single Request with id
  router.get("/:studentId/requests/:id", [authenticate], requests.findOne);

  // Update a Lesson with id
  router.put("/:studnetId/requests/:id", [authenticate], requests.update);

  // Delete a Lesson with id
  router.delete("/:studentId/requests/:id", [authenticate], requests.delete);

  // Delete all Lessons
  router.delete("/:stuentId/requests/:id", [authenticate], requests.deleteAll);

  app.use("/accommodations-t5/requests", router);
};
