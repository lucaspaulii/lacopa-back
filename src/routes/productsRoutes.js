import { Router } from "express";
import { postProduct, fetchProductsHighlights, fetchProductsCategories, fecthCategoryProducts } from "../controllers/productsControllers.js";
import { schemaValidateProduct } from "../middlewares/schemaValidateProduct.js";

const router = Router();

router.post("/createproduct", schemaValidateProduct, postProduct);
router.get("/main", fetchProductsHighlights);
router.get("/categories", fetchProductsCategories);
router.get("/category/:category", fecthCategoryProducts);

export default router;
