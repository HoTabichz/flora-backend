const Joi = require('joi');

const createBouquetSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  photoURL: Joi.string().uri().optional(),
  favorite: Joi.boolean().optional(),
});

const updateBouquetSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  photoURL: Joi.string().uri().optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { createBouquetSchema, updateBouquetSchema, favoriteSchema };
