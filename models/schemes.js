const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(5)
    .max(15)
    .required(),
  favotite: Joi.boolean(),
});

const favoriteContactsSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsSchema, favoriteContactsSchema };
