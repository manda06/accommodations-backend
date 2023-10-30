module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define("request", {
    status: {
      type: Sequelize.STRING,
    },
    meetingTime: {
      type: Sequelize.TIME,
    },
    meetingDate: {
      type: Sequelize.DATE,
    },
    grievances: {
      type: Sequelize.STRING,
    }
  });
  return Request;
};
