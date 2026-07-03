const Joi = require("joi");

const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    experience: Joi.string().required(),
    avatar: Joi.string().optional(),
    role: Joi.string().optional(),
    password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};