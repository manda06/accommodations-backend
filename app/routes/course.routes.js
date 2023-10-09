module.exports = (app) => {
  const course = require("../controllers/course.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new course
  router.post("/", [authenticate], course.create);

  // Retrieve all course
  router.get("/", [authenticate], course.findAll);

  // Retrieve all course for user
  router.get("/userTut/:userId", [authenticate], course.findAllForCourse);

  // Retrieve a single Course with id
  router.get("/:id", [authenticate], course.findOne);

  // Update a course with id
  router.put("/:id", [authenticate], course.update);

  // Delete a course with id
  router.delete("/:id", [authenticate], course.delete);

  // Delete all course
  router.delete("/", [authenticate], course.deleteAll);

  app.use("/course/course", router);
};
