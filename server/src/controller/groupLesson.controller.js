const {
    GroupLesson,
    Group,
    LessonTemplate,
    Teacher,
} = require("../model");

// Create
exports.createGroupLesson = async (req, res) => {
    try {
        const {
            groupId,
            lessonTemplateId,
            teacherId,
            date,
            startedAt,
            endedAt,
            notes,
            homework,
            status,
        } = req.body;
        if (!groupId || !lessonTemplateId || !teacherId || !date) {
            return res.status(400).json({
                message: "All required fields must be filled.",
            });
        }
        const group = await Group.findByPk(groupId);
        if (!group)
            return res.status(404).json({
                message: "Group not found.",
            });
        const lesson = await LessonTemplate.findByPk(lessonTemplateId);
        if (!lesson)
            return res.status(404).json({
                message: "Lesson template not found.",
            });
        const teacher = await Teacher.findByPk(teacherId);
        if (!teacher)
            return res.status(404).json({
                message: "Teacher not found.",
            });
        const exist = await GroupLesson.findOne({
            where: {
                groupId,
                lessonTemplateId,
            },
        });
        if (exist) {
            return res.status(409).json({
                message: "This lesson has already been assigned to this group.",
            });
        }
        const groupLesson = await GroupLesson.create({
            groupId,
            lessonTemplateId,
            teacherId,
            date,
            startedAt,
            endedAt,
            notes,
            homework,
            status,
        });
        return res.status(201).json({
            message: "Group lesson created successfully.",
            data: groupLesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get All
exports.getGroupLessons = async (req, res) => {
    try {
        const lessons = await GroupLesson.findAll({
            include: [
                {
                    model: Group,
                    as: "group",
                },
                {
                    model: LessonTemplate,
                    as: "lessonTemplate",
                },
                {
                    model: Teacher,
                    as: "teacher",
                },
            ],
            order: [["date", "ASC"]],
        });

        return res.status(200).json({
            data: lessons,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get One
exports.getGroupLesson = async (req, res) => {
    try {
        const lesson = await GroupLesson.findByPk(req.params.id, {
            include: [
                {
                    model: Group,
                    as: "group",
                },
                {
                    model: LessonTemplate,
                    as: "lessonTemplate",
                },
                {
                    model: Teacher,
                    as: "teacher",
                },
            ],
        });
        if (!lesson) {
            return res.status(404).json({
                message: "Group lesson not found.",
            });
        }
        return res.status(200).json({
            data: lesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update
exports.updateGroupLesson = async (req, res) => {
    try {
        const lesson = await GroupLesson.findByPk(req.params.id);
        if (!lesson) {
            return res.status(404).json({
                message: "Group lesson not found.",
            });
        }
        await lesson.update(req.body);
        return res.status(200).json({
            message: "Group lesson updated successfully.",
            data: lesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete
exports.deleteGroupLesson = async (req, res) => {
    try {
        const lesson = await GroupLesson.findByPk(req.params.id);
        if (!lesson) {
            return res.status(404).json({
                message: "Group lesson not found.",
            });
        }
        await lesson.destroy();
        return res.status(200).json({
            message: "Group lesson deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};