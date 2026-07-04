const { CourseTemplate } = require("../model");

// Create Course Template
exports.createCourseTemplate = async (req, res) => {
    try {
        const {
            type,
            title,
            description,
            totalLessons,
            status,
        } = req.body;

        if (!type || !title || !totalLessons) {
            return res.status(400).json({
                message: "Type, title and totalLessons are required.",
            });
        }

        const exist = await CourseTemplate.findOne({
            where: { type },
        });

        if (exist) {
            return res.status(409).json({
                message: "Course template already exists.",
            });
        }

        const courseTemplate = await CourseTemplate.create({
            type,
            title,
            description,
            totalLessons,
            status,
        });

        return res.status(201).json({
            message: "Course template created successfully.",
            data: courseTemplate,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get All
exports.getCourseTemplates = async (req, res) => {
    try {
        const templates = await CourseTemplate.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            data: templates,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get By Id
exports.getCourseTemplate = async (req, res) => {
    try {
        const template = await CourseTemplate.findByPk(req.params.id);

        if (!template) {
            return res.status(404).json({
                message: "Course template not found.",
            });
        }

        return res.status(200).json({
            data: template,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update
exports.updateCourseTemplate = async (req, res) => {
    try {
        const template = await CourseTemplate.findByPk(req.params.id);

        if (!template) {
            return res.status(404).json({
                message: "Course template not found.",
            });
        }

        if (req.body.type) {
            const exist = await CourseTemplate.findOne({
                where: {
                    type: req.body.type,
                },
            });

            if (exist && exist.id !== template.id) {
                return res.status(409).json({
                    message: "Course type already exists.",
                });
            }
        }

        await template.update(req.body);

        return res.status(200).json({
            message: "Course template updated successfully.",
            data: template,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete
exports.deleteCourseTemplate = async (req, res) => {
    try {
        const template = await CourseTemplate.findByPk(req.params.id);

        if (!template) {
            return res.status(404).json({
                message: "Course template not found.",
            });
        }

        await template.destroy();

        return res.status(200).json({
            message: "Course template deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};