module.exports = (sequelize, DataTypes) => {
    const CourseTemplate = sequelize.define(
        "CourseTemplate",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.ENUM("HTML", "CSS", "JavaScript", "React", "Node.js"),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        { timestamps: true, }
    );

    return CourseTemplate;
};