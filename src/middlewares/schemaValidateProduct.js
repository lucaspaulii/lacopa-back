import { productsCollection } from "../database/db.js";
import { productSchema } from "../modules/productSchema.js";

export async function schemaValidateProduct(req, res, next) {
  const product = req.body;

  const { error } = productSchema.validate(product, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const productExists = await productsCollection.findOne({
      name: product.name,
    });
    if (productExists) {
      return res.sendStatus(409);
    }
  } catch (error) {
    return res.sendStatus(405);
  }
  req.productObject = product;
  next();
  return;
}
