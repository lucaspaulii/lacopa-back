import { ObjectId } from "mongodb";
import { productsCollection, cartCollection, usersCollection } from "../database/db.js";

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

export async function fetchProductDetails(req, res, next) {
  try {
    const  { productId } = req.params;
    const productDetails = await productsCollection.find({_id: ObjectId(productId)}).toArray();
    res.send(productDetails);
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fecthCategoryProducts(req, res) {
  const category = req.params.category;
  let categoryPadronized = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    const products = await productsCollection.find({ category: categoryPadronized}).toArray();
    return res.send(products);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fetchRelatedProducts(req, res) {
  try {
    const limit = 4;
    const { productId } = req.params;
    const productDetails = await productsCollection.find({_id: ObjectId(productId)}).toArray();
    const relatedProducts = await productsCollection.find({category: productDetails[0].category}).limit(limit).toArray();
    return res.send(relatedProducts.slice(1));
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fetchShoppingCart(req, res) {
  const userID = req.userID; 
  try {
    const shoppingCart = await cartCollection.findOne({ _id: userID });
    if (!shoppingCart) {
      return res.sendStatus(404);
    }
    return res.send(shoppingCart.products);
  } catch (error) {
    return res.sendStatus(401);}
}

export async function addShoppingCart(req, res) {
  const userID = req.userID; 
  const body = req.body;
  const filter = { _id: userID }
  try {
    
    const shoppingCart = await cartCollection.findOne({ _id: userID });
      if (!shoppingCart.products) {
        const createCart = {$push: { products: body}}
        const createdCart = await cartCollection.updateOne(filter, createCart); }
      else {
        const updateCart = await cartCollection.findOneAndUpdate(filter, {$push: {products: body}})
      }
      return res.sendStatus(200);
    }
   catch (error) {
    return res.sendStatus(400);}

}

export async function fetchProductCart(req, res) {
  try {
    const  { productId } = req.params;
    const productDetails = await productsCollection.find({_id: ObjectId(productId)}).toArray();
    res.send(productDetails);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function fecthSearchedProducts(req, res) {
  const {searchInput} = req.params;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  try {
    const lowerCaseSearchInput = searchInput.toLowerCase()
    const searchedProducts1 = await productsCollection.find({name: new RegExp(lowerCaseSearchInput)}).toArray();
    const upperCaseSearchInput = capitalizeFirstLetter(lowerCaseSearchInput);
    const searchedProducts2 = await productsCollection.find({name: new RegExp(upperCaseSearchInput)}).toArray();
    const searchedProducts = [...searchedProducts1, searchedProducts2]
    res.send(searchedProducts)
  } catch (error) {
    return res.sendStatus(400);
  }
  
}