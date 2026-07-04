const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Teacher = require("./teacher.model")(sequelize, Sequelize.DataTypes);
db.Student = require("./student.model")(sequelize, Sequelize.DataTypes);
db.Group = require("./group.model")(sequelize, Sequelize.DataTypes);
db.GroupLesson = require("./groupLesson.model")(sequelize, Sequelize.DataTypes);
db.CourseTemplate = require("./courseTemplate.model")(sequelize, Sequelize.DataTypes);
db.LessonTemplate = require("./lessonTemplate.model")(sequelize, Sequelize.DataTypes);

// =====================
// CourseTemplate <-> LessonTemplate
// =====================

db.CourseTemplate.hasMany(db.LessonTemplate, {
    foreignKey: "courseTemplateId",
    as: "lessons",
});

db.LessonTemplate.belongsTo(db.CourseTemplate, {
    foreignKey: "courseTemplateId",
    as: "courseTemplate",
});

// =====================
// Group <-> GroupLesson
// =====================

db.Group.hasMany(db.GroupLesson, {
    foreignKey: "groupId",
    as: "groupLessons",
});

db.GroupLesson.belongsTo(db.Group, {
    foreignKey: "groupId",
    as: "group",
});

// =====================
// LessonTemplate <-> GroupLesson
// =====================

db.LessonTemplate.hasMany(db.GroupLesson, {
    foreignKey: "lessonTemplateId",
    as: "groupLessons",
});

db.GroupLesson.belongsTo(db.LessonTemplate, {
    foreignKey: "lessonTemplateId",
    as: "lessonTemplate",
});

// =====================
// Teacher <-> GroupLesson
// =====================

db.Teacher.hasMany(db.GroupLesson, {
    foreignKey: "teacherId",
    as: "groupLessons",
});

db.GroupLesson.belongsTo(db.Teacher, {
    foreignKey: "teacherId",
    as: "teacher",
});

module.exports = db;