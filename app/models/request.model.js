module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define("request", {
    requestId: {
      type: Sequelize.STRING,
    },
    studentId: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    meetingTime: {
      type: Sequelize.DATE,
    },
    meetingDate: {
      type: Sequelize.DATE,
    }
  });
  return Request;
};
