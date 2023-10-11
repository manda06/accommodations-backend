module.exports = (sequelize, Sequelize) => {
    const AccommodationsCategory = sequelize.define("AccommodationsCategory", {
      category: {
        type: Sequelize.STRING,
      },
      categoryid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
    });
  
    return AccommodationsCategory;
  };
  