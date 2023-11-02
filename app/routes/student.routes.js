module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/", [authenticate], students.create);

  // Retrieve all Students
  router.get("/", [authenticate], students.findAll);

  // Retrieve all Students for user
  //router.get("/students/:studentId", [authenticate], students.findAllForUser);
 
  // Retrieve a single Student with id
  router.get("/:id", [authenticate], students.findOne);

  router.get("/userId/:userId", [authenticate], students.getUserId);

  // Update a Student with id
  router.put("/:id", [authenticate], students.update);

  // Delete a Student with id
  router.delete("/:id", [authenticate], students.delete);

  // Delete all Studnets
  router.delete("/", [authenticate], students.deleteAll);

  app.use("/accommodations-t5/students", router);
};
