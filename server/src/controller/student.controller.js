const bcrypt = require("bcrypt");
const { Student, Group } = require("../model");
const { generateUsername } = require("../utils/generateUsername");
const { createSchema, loginSchema } = require("../validation/student.validator");
const generateToken = require("../utils/generateToken");

exports.createStudent = async (req, res) => {
    try {
        const { error } = createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { fullName, phone, parentPhone, groupId } = req.body;

        if (!fullName || !groupId || !parentPhone) {
            return res.status(400).json({
                message: "Full name and group are required.",
            });
        }

        const group = await Group.findOne({
            where: {
                id: groupId,
                teacherId: req.user.id,
            },
        });

        if (!group) {
            return res.status(404).json({
                message: "Group not found.",
            });
        }

        const username = await generateUsername(fullName);

        const plainPassword = crypto.randomBytes(4).toString("hex");
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const student = await Student.create({
            fullName,
            phone,
            parentPhone,
            username,
            password: hashedPassword,
            teacherId: req.user.id,
            groupId,
        });

        return res.status(201).json({
            message: "Student created successfully.",
            student: {
                id: student.id,
                fullName: student.fullName,
                username: student.username,
                parentPhone: student.parentPhone,
                phone: student.phone,
                groupId: student.groupId,
            },
            login: {
                username,
                password: plainPassword,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { username, password } = req.body
        const student = await Student.findOne({
            where: { username }
        })
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        await student.update({
            lastSeen: new Date(),
        });
        const token = generateToken(student.id);
        const studentData = student.toJSON();
        delete studentData.password;
        res.status(200).json({
            message: "Login successful",
            student: studentData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        const student = await Student.findByPk(req.user.id, {
            attributes: {
                exclude: ["password"],
            },
        })
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }
        res.status(200).json({
            student
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}