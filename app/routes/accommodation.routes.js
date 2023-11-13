module.exports = (app) => {
    const accommodations = require("../controllers/accommodation.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], accommodations.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], accommodations.findAll);
  
    
    // Retrieve all accommodations for a category
    router.get("/:category", [authenticate], accommodations.findAllForCategory);  

    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], accommodations.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [authenticate], accommodations.update);
  
    // Delete a Accommodation with id
    router.delete("/:id", [authenticate], accommodations.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], accommodations.deleteAll);
  
    app.use("/accommodations-t5/accommodations", router);
  };