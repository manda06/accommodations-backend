module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semester", {
    title: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    courseId: {
      type: Sequelize.INTEGER,
    },
  });
  return Semester;
};
