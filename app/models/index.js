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
//db.accommodationrequest = sequelize.define('accommodationrequest', {}, { timestamps: false });

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.AccommodationsCategory = require("./AccommodationsCategory.model.js")(sequelize, Sequelize);
db.StudentCourseSchedule = require("./StudentCourseSchedule.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.accommodationRequests = require("./accommodationsRequests.model.js")(sequelize, Sequelize);

db.course = require("./course.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);

db.student = require("./student.model.js")(sequelize, Sequelize);
db.request = require("./request.model.js")(sequelize, Sequelize);
db.accommodation = require("./accommodation.model.js")(sequelize, Sequelize);

// foreign keys for accommodation



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


// foreign key for lessons
db.semester.hasMany(
  db.course,
  { as: "course" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.course.belongsTo(
  db.semester,
  { as: "semester" },
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

db.accommodation.belongsToMany(
  db.request,
  {through: db.accommodationRequests}
);

db.request.belongsToMany(
  db.accommodation,
  {through: db.accommodationRequests}
);
db.request.hasMany(db.accommodationRequests);
db.accommodationRequests.belongsTo(db.request);
db.accommodation.hasMany(db.accommodationRequests);
db.accommodationRequests.belongsTo(db.accommodation);


db.request.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
module.exports = db;
