import { Router } from "express";

import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, editProduct, getAllProduct } from "../controllers/productController.js";
let route = Router();

route.post("/product", verifyToken, isAdmin, createProduct);
route.get("/product", getAllProduct);
route.put("/product/:id", verifyToken, isAdmin, editProduct);
route.delete("/product/:id", verifyToken, isAdmin, deleteProduct);

export default route;
