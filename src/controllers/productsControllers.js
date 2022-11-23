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

export async function fetchProducts(req, res) {
  try {
    const fetchedProducts = await productsCollection
    .find()
    .toArray();
    res.send(fetchedProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
}