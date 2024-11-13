const Joi = require('joi');

// Define the schema for an order
const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/).required(),
  }).required(),
  pickup: Joi.object({
    date: Joi.date().iso().required(),
    time: Joi.string().pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/).required(),
  }).required(),
  items: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().min(1).required(),
      instructions: Joi.string().allow(''),
      options: Joi.object().pattern(Joi.string(), [Joi.string(), Joi.array().items(Joi.string())]),
    })
  ).min(1).required(),
  total: Joi.number().required(),
});

module.exports = { orderSchema };
