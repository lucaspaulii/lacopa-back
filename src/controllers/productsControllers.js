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
    const limit = 9;
    const fetchedProducts = await productsCollection
    .find()
    .limit(limit)
    .toArray();
    res.send(fetchedProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fetchProductsCategories(req, res) {
    console.log('here')
    try {
        const fetchedProducts = await productsCollection.find().toArray();
        const allCategories = [];
        fetchedProducts.forEach(product => allCategories.push(product.category));
        const categories = [...new Set(allCategories)];
    } catch (error) {
        return res.sendStatus(400);
    }
}