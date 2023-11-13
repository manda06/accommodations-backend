module.exports = (sequelize, Sequelize) => {
    const StudentCourseSchedule = sequelize.define("StudentCourseSchedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      courseid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      studentid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    
    });
  
    return StudentCourseSchedule;
  };
  