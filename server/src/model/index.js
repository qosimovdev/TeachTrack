const Sequelize = require("sequelize");
const sequelize = require("../config/db")

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Teacher = require("./teacher.model")(sequelize, Sequelize.DataTypes)
db.Student = require("./student.model")(sequelize, Sequelize.DataTypes)
db.Group = require("./group.model")(sequelize, Sequelize.DataTypes)
db.GroupLesson = require("./groupLesson.model")(sequelize, Sequelize.DataTypes)
db.CourseTemplate = require("./courseTemplate.model")(sequelize, Sequelize.DataTypes)
db.LessonTemplate = require("./lessonTemplate.model")(sequelize, Sequelize.DataTypes)

module.exports = db