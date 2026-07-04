module.exports = (sequelize, DataTypes) => {
    const GroupLesson = sequelize.define(
        "GroupLesson",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lessonTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            teacherId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            startedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            endedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            homework: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            status: {
                type: DataTypes.ENUM(
                    "PENDING",
                    "IN_PROGRESS",
                    "COMPLETED",
                    "CANCELLED"
                ),
                defaultValue: "PENDING",
            },
        },
        {
            timestamps: true,
        }
    );
    return GroupLesson;
};