const Joi = require("joi");

const createSchema = Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    parentPhone: Joi.string().required(),
    groupId: Joi.number().required(),
    rankPoint: Joi.number().optional(),
    status: Joi.string().required(),
    role: Joi.string().required(),
    lastSeen: Joi.date().optional(),
    avatar: Joi.string().optional(),
    mustChangePassword: Joi.boolean().default(true).required,
})

const loginSchema = Joi.object({
    username: Joi.string().required,
    password: Joi.string().required()
})

module.exports = { createSchema, loginSchema }