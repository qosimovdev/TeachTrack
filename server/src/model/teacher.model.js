module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define(
        "Teacher",
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
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            experience: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "TEACHER"
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

    return Teacher;
};