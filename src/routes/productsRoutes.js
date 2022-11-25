import { Router } from "express";
import { postProduct, fetchProductsHighlights, fetchProductsCategories, fetchProductDetails } from "../controllers/productsControllers.js";
import { schemaValidateProduct } from "../middlewares/schemaValidateProduct.js";

const router = Router();

router.post("/createproduct", schemaValidateProduct, postProduct);
router.get("/main", fetchProductsHighlights);
router.get("/categories", fetchProductsCategories);
router.get("/products/:productId", fetchProductDetails);

export default router;
