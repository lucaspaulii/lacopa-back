import { ObjectId } from "mongodb";
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
    return res.send(fetchedProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fetchProductsCategories(req, res) {
    try {
        const fetchedProducts = await productsCollection.find().toArray();
        const allCategories = [];
        fetchedProducts.forEach(product => allCategories.push(product.category));
        const categories = [...new Set(allCategories)];
        return res.send(categories);
    } catch (error) {
        return res.sendStatus(400);
    }
}

export async function fetchProductDetails(req, res) {
  try {
    const  { productId } = req.params;
    const productDetails = await productsCollection.find({_id: ObjectId(productId)}).toArray();
    res.send(productDetails);
  } catch (error) {
    return res.sendStatus(400);
  }
}