import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required(),
  category: joi.string().required(),
  value: joi.number().required(),
  description: joi.string().required(),
  amount: joi.number().required(),
  image: joi.string().uri(),
});
