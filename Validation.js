// validation.js
const Joi = require('joi');

const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  }).required(),

  pickup: Joi.object({
    date: Joi.date().iso().required(),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  }).required(),

  items: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().min(1).required(),
      quantity: Joi.number().integer().min(1).required(),
      options: Joi.object().pattern(
        Joi.string(),
        Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
      ).optional()
    }).unknown(true)
  ).required(),

  total: Joi.number().required(),
  orderType: Joi.string().valid('pickup', 'delivery').optional()
});


module.exports = { orderSchema };

