module.exports = (app) => {
    const AccommodationsCategory = require("../controllers/AccommodationsCategory.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new AccommodationsCategory
    router.post("/", [authenticate], AccommodationsCategory.create);
  
    // Retrieve all AccommodationsCategory
    router.get("/", [authenticate], AccommodationsCategory.findAll);
  
    // Retrieve a single AccommodationsCategory with id
    router.get("/:id", [authenticate], AccommodationsCategory.findOne);
  
    // Update a AccommodationsCategory with id
    router.put("/:id", [authenticate], AccommodationsCategory.update);
  
    // Delete a AccommodationsCategory with id
    router.delete("/:id", [authenticate], AccommodationsCategory.delete);
  
    // Delete all AccommodationsCategory
    router.delete("/", [authenticate], AccommodationsCategory.deleteAll);
  
    app.use("/accommodations-t5/AccommodationsCategory", router);
  };
  