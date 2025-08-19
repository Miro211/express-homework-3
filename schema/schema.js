const Joi = require('joi')

const registerSchema = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Z][a-zA-Z]*$/, "capitalized")
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.pattern.name": "First letter must be capitalized"
        }),

    age: Joi.number()
        .min(18)
        .max(65)
        .required()
        .messages({
            "number.base": "Age must be number",
            "number.min": "Min age is 18",
            "number.max": "Max age is 65",
            "any.required": "Age is required"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email is incorrect"
        }),

    password: Joi.string()
        .min(5)
        .pattern(/[A-Z]/, "uppercase")
        .pattern(/[^a-zA-Z0-9]/, "special")
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must have minimum 5 symbol",
            "string.pattern.name": "Password must have minimum 1 capitallized letter"
        })
})

module.exports = { registerSchema }
