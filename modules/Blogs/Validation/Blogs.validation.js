const Joi = require("joi");

module.exports = {
  addUserSchema: Joi.object().required().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  }),
  loginSchema: Joi.object().required().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};