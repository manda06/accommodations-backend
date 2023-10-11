module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    studentId: {
      type: Sequelize.STRING,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    agreementDate: {
      type: Sequelize.DATE,
    }
 
  });

  return Student;
};
