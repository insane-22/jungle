import express from "express";
import { requireSignIn, isAdmin } from "./../middleware/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategory,
  singleCategory,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-category", categoryController);

router.get("/single-category/:slug", singleCategory)

router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteCategory)

export default router;
