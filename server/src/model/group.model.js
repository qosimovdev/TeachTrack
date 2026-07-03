module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
        "Group",
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
            courseTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            days: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            startTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            endTime: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            totalLessons: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("ACTIVE", "INACTIVE", "GRADUATED"),
                defaultValue: "ACTIVE",
            },
            teacherId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: true }
    );

    return Group;
};