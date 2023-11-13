module.exports = (sequelize, Sequelize) => {
    const Request = require('./request.model.js')
    const Accommodation = require('./accommodation.model.js')

    const AccommodationsRequests = sequelize.define("accommodationsRequests", {
     
    });
  
    return AccommodationsRequests;
  };
  