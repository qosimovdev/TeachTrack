const { Group, Teacher, CourseTemplate } = require("../model");

// Create Group
exports.createGroup = async (req, res) => {
    try {
        const {
            name,
            courseTemplateId,
            startDate,
            days,
            startTime,
            endTime,
            totalLessons,
            status,
            teacherId,
        } = req.body;
        if (
            !name ||
            !courseTemplateId ||
            !startDate ||
            !days ||
            !startTime ||
            !endTime ||
            !totalLessons ||
            !teacherId
        ) {
            return res.status(400).json({
                message: "All required fields must be filled.",
            });
        }
        const template = await CourseTemplate.findByPk(courseTemplateId);
        if (!template) {
            return res.status(404).json({
                message: "Course template not found.",
            });
        }
        const teacher = await Teacher.findByPk(teacherId);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found.",
            });
        }
        const group = await Group.create({
            name,
            courseTemplateId,
            startDate,
            days,
            startTime,
            endTime,
            totalLessons,
            status,
            teacherId,
        });
        res.status(201).json({
            message: "Group created successfully.",
            data: group,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.findAll({
            include: [
                {
                    model: Teacher,
                    as: "teacher",
                    attributes: ["id", "fullName", "phone"],
                },
                {
                    model: CourseTemplate,
                    as: "courseTemplate",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Single Group
exports.getGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id, {
            include: [
                {
                    model: Teacher,
                    as: "teacher",
                    attributes: ["id", "fullName", "phone"],
                },
                {
                    model: CourseTemplate,
                    as: "courseTemplate",
                },
            ],
        });
        if (!group) {
            return res.status(404).json({
                message: "Group not found.",
            });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Group
exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (!group) {
            return res.status(404).json({
                message: "Group not found.",
            });
        }
        if (req.body.teacherId) {
            const teacher = await Teacher.findByPk(req.body.teacherId);
            if (!teacher) {
                return res.status(404).json({
                    message: "Teacher not found.",
                });
            }
        }
        if (req.body.courseTemplateId) {
            const template = await CourseTemplate.findByPk(
                req.body.courseTemplateId
            );
            if (!template) {
                return res.status(404).json({
                    message: "Course template not found.",
                });
            }
        }
        await group.update(req.body);
        res.status(200).json({
            message: "Group updated successfully.",
            data: group,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Group
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (!group) {
            return res.status(404).json({
                message: "Group not found.",
            });
        }
        await group.destroy();
        res.status(200).json({
            message: "Group deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};