import express from "express";

import { requireUserAuth } from "../middleware/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getDiscussionDetailCommentsByUserId,
  getDiscussionDetails,
  getDiscussionDetailsByCategoryId,
  getDiscussionDetailsByUserId,
  getDiscussionsByCategoryId,
  getDiscussionsByUserId,
  getDiscussionsView,
  getPostById,
  getPostDetail,
  getReplyDiscussionsById,
  getReplyDiscussionsByUserId,
  getReviewViewById,
  getReviewsByUserId,
  getReviewsView,
  searchDiscussionDetails,
  togglePostStatus,
  updatePost,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.use(requireUserAuth);

postRouter.post("/", createPost);
postRouter.get("/", getAllPosts); // Get all Posts
postRouter.get("/view/discussions", getDiscussionsView); // Get discussions view
postRouter.get("/discussions/details", getDiscussionDetails); // Get discussions view
postRouter.get("/discussions/details/user/:userId", getDiscussionDetailsByUserId); // Get discussions view
postRouter.get("/discussions/details/user/comments/:userId", getDiscussionDetailCommentsByUserId); // Get discussions view
postRouter.get("/discussions/details/:categoryId", getDiscussionDetailsByCategoryId); // Get discussions view
postRouter.get("/discussions/detail/:discussionId", getPostDetail); // Get discussions view
postRouter.get("/discussions/details/search/content", searchDiscussionDetails); // Get discussions view
postRouter.get("/view/discussions/category/:categoryId", getDiscussionsByCategoryId); // Get category discussions view by categoryId
postRouter.get("/view/discussions/replies/:discussionId", getReplyDiscussionsById); // Get reply discussions view by discussionId
postRouter.get("/view/discussions/user/:userId", getDiscussionsByUserId); // Get reply discussions view by userId
postRouter.get("/view/discussions/user/:userId/replies", getReplyDiscussionsByUserId); // Get reply discussions view by userId
postRouter.get("/view/reviews", getReviewsView); // Get discussions view
postRouter.get("/view/reviews/:reviewId", getReviewViewById); // Get reviews by reviewId
postRouter.get("/reviews/users/:userId", getReviewsByUserId); // Get reviews by userId
postRouter.get("/:id", getPostById); // Get a single Post by ID
postRouter.put("/:id", updatePost); // Update a Post by ID
postRouter.delete("/:id", deletePost); // Delete a Post by ID
postRouter.patch('/:postId/status', togglePostStatus); // Route to toggle post status

export default postRouter;
