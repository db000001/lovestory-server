import express from "express";
import { requireUserAuth } from "../middleware/authMiddleware.js";
import {
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  createMatches,
  getMatchesView,
  addMatchingAction,
  getMatchedUserData,
  getMatchedUsersByUserId,
  updateMatchStatus,
} from "../controllers/match.controller.js";

const matchRouter = express.Router();

matchRouter.use(requireUserAuth);

// Create multiple matches
matchRouter.post("/multiple", createMatches);

// Create matching action
matchRouter.post("/action", addMatchingAction);

// Get all matches
matchRouter.get("/", getAllMatches);

// Get matched user data
matchRouter.get("/action/:userId", getMatchedUserData);

// Get all matches view
matchRouter.get("/view", getMatchesView);

// Get a match by ID
matchRouter.get("/:id", getMatchById);

// Get a matched users by userId
matchRouter.get('/users/:userId', getMatchedUsersByUserId);

// Update a match
matchRouter.put("/:id", updateMatch);

// Accept a match
matchRouter.put("/status/:userId", updateMatchStatus);

// Delete a match
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
