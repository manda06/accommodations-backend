module.exports = (app) => {
  const courses = require("../controllers/course.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new course
  router.post("/", [authenticate], courses.create);

  // Retrieve all course
  router.get("/", [authenticate], courses.findAll);

  // Retrieve all course for user
  router.get("/userTut/:userId", [authenticate], courses.findAllForCourse);

  // Retrieve a single Course with id
  router.get("/:id", [authenticate], courses.findOne);

  // Update a course with id
  router.put("/:id", [authenticate], courses.update);

  // Delete a course with id
  router.delete("/:id", [authenticate], courses.delete);

  // Delete all course
  router.delete("/", [authenticate], courses.deleteAll);

  app.use("/accommodations-t5/courses", router);
};
