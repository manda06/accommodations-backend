module.exports = (app) => {
    const accommodationRequests = require("../controllers/accommodationsRequests.controler.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], accommodationRequests.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], accommodationRequests.findAll);

    // Retrieve all accommodations for a request
    router.get("/request/:requestId", [authenticate], accommodationRequests.findAllForRequest);

    // Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], accommodationRequests.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [authenticate], accommodationRequests.update);
  
    // Delete a Accommodation with id
    router.delete("/:requestId" + "/:accommodationId", [authenticate], accommodationRequests.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], accommodationRequests.deleteAll);
  
    app.use("/accommodations-t5/accommodationRequests", router);
  };