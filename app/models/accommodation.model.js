module.exports = (sequelize, Sequelize) => {
    const Student = require('../models/student.model.js')
    const Course = require('../models/course.model.js')
    
    const Accommodation = sequelize.define("accommodation", {
      name: {
        type: Sequelize.STRING,
      },
      request: {
        type: Sequelize.STRING,
      },
      approvedBy:{
        type: Sequelize.STRING,
      },
      category:{
        type: Sequelize.STRING,
      },

      

    });
    
   

    return Accommodation;
  };
  