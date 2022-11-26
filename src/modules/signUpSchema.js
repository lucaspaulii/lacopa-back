import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  address: joi.string().min(5).required(),
  cpf: joi.number(),
});
