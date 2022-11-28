import { Router } from "express";
import {
  postProduct,
  fetchProductsHighlights,
  fetchProductsCategories,
  fecthCategoryProducts,
  fetchProductDetails,
  fetchRelatedProducts,
  fetchShoppingCart,
  addShoppingCart,
  fetchProductCart,
  fecthSearchedProducts,
} from "../controllers/productsControllers.js";
import { schemaValidateProduct } from "../middlewares/schemaValidateProduct.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post("/createproduct", schemaValidateProduct, postProduct);
router.get("/main", fetchProductsHighlights);
router.get("/categories", fetchProductsCategories);
router.get("/products/:productId", fetchProductDetails);
router.get("/products/:productId/related", fetchRelatedProducts);
router.get("/category/:category", fecthCategoryProducts);
router.get("/cart", validateToken, fetchShoppingCart);
router.get("/cart/details", fetchProductCart);
router.get("/product/:searchInput", fecthSearchedProducts);
router.post("/cart", validateToken, addShoppingCart);
export default router;
