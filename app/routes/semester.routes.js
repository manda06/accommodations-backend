module.exports = (app) => {
  const semester = require("../controllers/semester.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Lesson for a Tutorial
  router.post("/:id/semester/", [authenticate], semester.create);

  // Retrieve all Lessons for a Tutorial
  router.get(
    "/:id/semester/",
    [authenticate],
    semester.findAllForSemester
  );

  // Retrieve all published Lessons for a Tutorial
  // router.get(
  //   "/:tutorialId/lessons/published",
  //   [authenticate],
  //   lessons.findAllPublished
  // );

  // Retrieve a single Lesson with id
  router.get("/:id/semester/:id", [authenticate], semester.findOne);

  // Update a Lesson with id
  router.put("/:id/semester/:id", [authenticate], semester.update);

  // Delete a Lesson with id
  router.delete("/:id/semester/:id", [authenticate], semester.delete);

  // Delete all Lessons
  router.delete("/:id/semester/:id", [authenticate], semester.deleteAll);

  app.use("/accommodations-t5/semesters", router);
};
