import express from "express";
import multer from "multer";

import { requireUserAuth } from "../middleware/authMiddleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.use(requireUserAuth);

// Configure multer for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
uploadRouter.post("/:dest", upload.single("file"), uploadFile);

export default uploadRouter;
