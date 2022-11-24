import { productsCollection } from "../database/db.js";

export async function postProduct(req, res) {
  const productObject = req.productObject;
  try {
    await productsCollection.insertOne(productObject);
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function fetchProductsHighlights(req, res) {
  try {
    const limit = 6;
    const fetchedProducts = await productsCollection
    .find()
    .limit(limit)
    .toArray();
    res.send(fetchedProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
}