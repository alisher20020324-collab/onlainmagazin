import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../controllers/categoryController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";
let route = Router();

route.post("/category", verifyToken, isAdmin, createCategory);
route.get("/category", getAllCategory);
route.put("/category/:id", verifyToken, isAdmin, editCategory);
route.delete("/category/:id", verifyToken, isAdmin, deleteCategory);

export default route;
