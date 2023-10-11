module.exports = (app) => {
    const StudentCourseSchedule = require("../controllers/StudentCourseSchedule.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [authenticate], StudentCourseSchedule.create);
  
    // Retrieve all StudentCourseSchedule
    router.get("/", [authenticate], StudentCourseSchedule.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [authenticate], StudentCourseSchedule.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [authenticate], StudentCourseSchedule.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [authenticate], StudentCourseSchedule.delete);
  
    // Delete all StudentCourseSchedule
    router.delete("/", [authenticate], StudentCourseSchedule.deleteAll);
  
    app.use("/accommodations-t5/StudentCourseSchedule", router);
  };
  