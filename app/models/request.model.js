module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define("request", {
    status: {
      type: Sequelize.STRING,
    },
    semester: {
      type: Sequelize.STRING,
    },
    accommCat: {
      type: Sequelize.STRING,
    },
    grievances: {
      type: Sequelize.STRING,
    }
  });
  return Request;
};
