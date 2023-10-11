const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.AccommodationsCategory = require("./AccommodationsCategory.model.js")(sequelize, Sequelize);
db.StudentCourseSchedule = require("./StudentCourseSchedule.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.request = require("./request.model.js")(sequelize, Sequelize);
db.accommodation = require("./accommodation.model.js")(sequelize, Sequelize);

// foreign keys for accommodation
db.accommodation.belongsToMany(
  db.student, 
  { through: 'studentAccomodation' });

db.accommodation.hasOne(db.course);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for students
db.user.hasMany(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for requests
db.student.hasMany(
  db.request,
  { as: "request" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.request.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


module.exports = db;
