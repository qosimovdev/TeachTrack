module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define(
        "Student",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            parentPhone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mustChangePassword: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            groupId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rankPoint: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("ACTIVE", "INACTIVE", "GRADUETED"),
                defaultValue: "ACTIVE",
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "STUDENT"
            },
            lastSeen: {
                type: DataTypes.DATE
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true, }
    );

    return Student;
};