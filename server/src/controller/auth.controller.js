const bcrypt = require("bcrypt");
const { Teacher } = require("../model");
const {
    registerSchema,
    loginSchema,
} = require("../validation/auth.validator");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { fullName, phone, email, experience, password, role } = req.body;
        const existingTeacher = await Teacher.findOne({
            where: { email },
        });
        if (existingTeacher) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher = await Teacher.create({
            fullName,
            phone,
            email,
            experience,
            role: "TEACHER",
            password: hashedPassword,
        });
        const token = generateToken(teacher.id);
        const teacherData = teacher.toJSON();
        delete teacherData.password;
        res.status(201).json({
            message: "Teacher registered successfully",
            teacher: teacherData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({
            where: { email },
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        await teacher.update({
            lastSeen: new Date(),
        });
        const token = generateToken(teacher.id);
        const teacherData = teacher.toJSON();
        delete teacherData.password;
        res.status(200).json({
            message: "Login successful",
            teacher: teacherData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.user.id, {
            attributes: {
                exclude: ["password"],
            },
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        res.status(200).json({
            teacher,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};