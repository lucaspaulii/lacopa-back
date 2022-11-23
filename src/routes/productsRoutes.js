import { Router } from "express";
import { postProduct } from "../controllers/productsControllers.js";
import { schemaValidateProduct } from "../middlewares/schemaValidateProduct.js";

const router = Router();

router.post("/createproduct", schemaValidateProduct, postProduct);

export default router;
