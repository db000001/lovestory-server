import express from "express";

import { requireUserAuth } from "../middleware/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesGroupedByRow,
  getCategoriesView,
  getCategoryById,
  toggleCategoryStatus,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.use(requireUserAuth);

categoryRouter.post("/", createCategory);
categoryRouter.put("/:categoryId", updateCategory);
categoryRouter.get("/", getAllCategories); // Get all Categories
categoryRouter.get("/grouped-by-row/:userId", getCategoriesGroupedByRow); // Get all Categories grouped
categoryRouter.get("/view", getCategoriesView); // Get all Categories View
categoryRouter.get("/:id", getCategoryById); // Get a single Category by ID
categoryRouter.delete("/:id", deleteCategory); // Delete a Category by ID
categoryRouter.patch('/:categoryId/status', toggleCategoryStatus); // Route to toggle category status

export default categoryRouter;
