import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, addProduct);
router.post("/get-products", verifyToken, getAllProducts);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
