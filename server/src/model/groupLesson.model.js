module.exports = (sequelize, DataTypes) => {
    const GroupLesson = sequelize.define(
        "GroupLesson",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lessonTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("ACTIVE", "INACTIVE", "GRADUATED"),
                defaultValue: "ACTIVE",
            },
        },
        { timestamps: true }
    );

    return GroupLesson;
};