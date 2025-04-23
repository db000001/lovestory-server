import express from "express";

import { requireUserAuth } from "../middleware/authMiddleware.js";
import {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getCollegesView,
  getCollegeUsersViewByCollegeId,
  getCollegeStatistics,
} from "../controllers/college.controller.js";

const collegeRouter = express.Router();

// collegeRouter.use(requireUserAuth);

collegeRouter.post("/", createCollege);
collegeRouter.get("/", getColleges);
collegeRouter.get("/view", getCollegesView);
collegeRouter.get(
  "/college-users-view/:collegeId",
  getCollegeUsersViewByCollegeId
);
collegeRouter.get("/:id", getCollegeById);
collegeRouter.get("/statistics/:collegeId", getCollegeStatistics);
collegeRouter.put("/:id", updateCollege);
collegeRouter.delete("/:id", deleteCollege);

export default collegeRouter;
