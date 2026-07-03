module.exports = (sequelize, DataTypes) => {
    const LessonTemplate = sequelize.define(
        "LessonTemplate",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            courseTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            objective: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            theory: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            examples: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            practiceTasks: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            quizQuestions: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            homeworkTemplate: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            estimatedDuration: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 120,
            },
            difficulty: {
                type: DataTypes.ENUM("BEGINNER", "INTERMEDIATE", "ADVANCED"),
                defaultValue: "BEGINNER",
            },
            resources: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            tags: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            timestamps: true,
        }
    );

    return LessonTemplate;
};