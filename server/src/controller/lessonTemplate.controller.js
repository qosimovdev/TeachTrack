const { LessonTemplate, CourseTemplate } = require("../model");

// Create Lesson Template
exports.createLessonTemplate = async (req, res) => {
    try {
        const {
            courseTemplateId,
            order,
            title,
            slug,
            topic,
            objective,
            theory,
            examples,
            practiceTasks,
            quizQuestions,
            homeworkTemplate,
            estimatedDuration,
            difficulty,
            resources,
            tags,
            isPublished,
        } = req.body;
        if (
            !courseTemplateId ||
            !order ||
            !title ||
            !topic ||
            !objective ||
            !theory
        ) {
            return res.status(400).json({
                message: "All required fields must be filled.",
            });
        }
        const course = await CourseTemplate.findByPk(courseTemplateId);
        if (!course) {
            return res.status(404).json({
                message: "Course template not found.",
            });
        }
        const existSlug = await LessonTemplate.findOne({
            where: { slug },
        });
        if (existSlug) {
            return res.status(409).json({
                message: "Slug already exists.",
            });
        }
        if (!slug) {
            const slugify = (text) =>
                text
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");

            const slug = req.body.slug || slugify(title);
        }
        const existOrder = await LessonTemplate.findOne({
            where: {
                courseTemplateId,
                order,
            },
        });
        if (existOrder) {
            return res.status(409).json({
                message: "Lesson order already exists for this course.",
            });
        }
        const lesson = await LessonTemplate.create({
            courseTemplateId,
            order,
            title,
            slug,
            topic,
            objective,
            theory,
            examples,
            practiceTasks,
            quizQuestions,
            homeworkTemplate,
            estimatedDuration,
            difficulty,
            resources,
            tags,
            isPublished,
        });
        return res.status(201).json({
            message: "Lesson template created successfully.",
            data: lesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get All
exports.getLessonTemplates = async (req, res) => {
    try {
        const lessons = await LessonTemplate.findAll({
            include: [
                {
                    model: CourseTemplate,
                    as: "courseTemplate",
                },
            ],
            order: [
                ["courseTemplateId", "ASC"],
                ["order", "ASC"],
            ],
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

// Get By Id
exports.getLessonTemplate = async (req, res) => {
    try {
        const lesson = await LessonTemplate.findByPk(req.params.id, {
            include: [
                {
                    model: CourseTemplate,
                    as: "courseTemplate",
                },
            ],
        });

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson template not found.",
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
exports.updateLessonTemplate = async (req, res) => {
    try {
        const lesson = await LessonTemplate.findByPk(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson template not found.",
            });
        }

        if (req.body.courseTemplateId) {
            const course = await CourseTemplate.findByPk(
                req.body.courseTemplateId
            );

            if (!course) {
                return res.status(404).json({
                    message: "Course template not found.",
                });
            }
        }

        if (req.body.slug) {
            const exist = await LessonTemplate.findOne({
                where: { slug: req.body.slug },
            });

            if (exist && exist.id !== lesson.id) {
                return res.status(409).json({
                    message: "Slug already exists.",
                });
            }
        }

        if (req.body.order) {
            const exist = await LessonTemplate.findOne({
                where: {
                    courseTemplateId:
                        req.body.courseTemplateId || lesson.courseTemplateId,
                    order: req.body.order,
                },
            });

            if (exist && exist.id !== lesson.id) {
                return res.status(409).json({
                    message: "Lesson order already exists.",
                });
            }
        }

        await lesson.update(req.body);

        return res.status(200).json({
            message: "Lesson template updated successfully.",
            data: lesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete
exports.deleteLessonTemplate = async (req, res) => {
    try {
        const lesson = await LessonTemplate.findByPk(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson template not found.",
            });
        }

        await lesson.destroy();

        return res.status(200).json({
            message: "Lesson template deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};