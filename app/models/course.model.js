module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    title: {
      type: Sequelize.STRING,
    },
    courseNum: {
      type: Sequelize.INTEGER,
    },
    courseId: {
      type: Sequelize.INTEGER,
    },
    facultyId: {
      type: Sequelize.INTEGER,
    },
    studentId: {
      type: Sequelize.INTEGER,
    },
  });
  return Course;
};
