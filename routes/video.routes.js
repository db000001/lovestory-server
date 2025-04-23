import express from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosView,
  getVideosViewByCollection,
  getVideosDetailViewById,
  toggleVideoStatus,
  getVideosDetailView,
  getVideoDetailsWithStructured,
  getVideoDetail,
  incrementVideoViews,
  toggleUserVideoLike
} from "../controllers/video.controller.js";
import { requireUserAuth } from "../middleware/authMiddleware.js";

const videoRouter = express.Router();

videoRouter.use(requireUserAuth);

// Video routes
videoRouter.post("/", createVideo); // Create a new video
videoRouter.post('/likes', toggleUserVideoLike);
videoRouter.get("/", getVideos); // Get all videos
videoRouter.get("/view", getVideosView); // Get videos view
videoRouter.get("/view/:collectionId", getVideosViewByCollection); // Get videos view
videoRouter.get("/view/detail/:videoId", getVideosDetailViewById); // Get videos detail view
videoRouter.get("/view/details/all", getVideosDetailView); // Get videos detail view
videoRouter.get("/details/all/group", getVideoDetailsWithStructured); // Get videos detail view
videoRouter.get("/details/:videoId", getVideoDetail); // Get videos detail view
videoRouter.get("/:id", getVideoById); // Get a single video by ID
videoRouter.put("/:id", updateVideo); // Update a video
videoRouter.delete("/:id", deleteVideo); // Delete a video
videoRouter.patch('/:videoId/status', toggleVideoStatus); // Route to toggle video status
videoRouter.patch('/:videoId/views', incrementVideoViews); // Route to toggle video status

export default videoRouter;
