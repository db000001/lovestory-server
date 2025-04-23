import express from "express";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getCollectionsView,
} from "../controllers/collection.controller.js";
import { requireUserAuth } from "../middleware/authMiddleware.js";

const collectionRouter = express.Router();

collectionRouter.use(requireUserAuth);

// Collection routes
collectionRouter.post("/", createCollection); // Create a new collection
collectionRouter.get("/", getCollections); // Get all collections
collectionRouter.get('/view', getCollectionsView); // Route to get all collections view data 
collectionRouter.get("/:id", getCollectionById); // Get a single collection by ID
collectionRouter.put("/:id", updateCollection); // Update a collection
collectionRouter.delete("/:id", deleteCollection); // Delete a collection

// Collection visibility routes
// collectionRouter.post("/visibility", createOrUpdateVisibility); // Create or update collection visibility

export default collectionRouter;
