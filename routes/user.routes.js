import express from "express";

import {
  changePassword,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersView,
  getUserStatisticsView,
  setUserActive,
  setUsersInactive,
  getBlockedUsers,
  updateUserStatus,
  getUserStatusActions,
  updateSummary,
  getUserFilterById,
  deleteUserFilter,
  createOrUpdateUserFilter,
  deleteUserQA,
  getUserQAByUserId,
  createUserQA,
  createUserFavoCategory,
  deleteUserFavoCategory,
  getUserFavoCategoriesByUserId,
  getMatchedUserById,
  toggleUserPostEmotion,
  getSomeUsers,
  createUserNotification,
  getUserNotificationByUserId,
  updateUserNotificationByUserId,
  deleteUserNotificationByUserId,
  createUserChatNotification,
  getUserChatNotificationsByUserId,
  updateUserChatNotificationsByUserId,
  deleteUserChatNotificationsByUserId,
  sendUserChatNotificationEmail,
  updateUserQAToggleByUserId,
  getUserByEmail,
} from "../controllers/user.controller.js";
import {
  isAdminMiddleware,
  requireUserAuth,
} from "../middleware/authMiddleware.js";
import { getUserSessions } from "../controllers/auth.controller.js";

const userRouter = express.Router();

// Not required authentication
userRouter.post("/qa", createUserQA);

userRouter.get("/qa/:userId", getUserQAByUserId);

userRouter.put("/qa/:userId", updateUserQAToggleByUserId);

userRouter.delete("/qa/:userId", deleteUserQA);

// Require authentication
userRouter.use(requireUserAuth);

userRouter.post("/", createUser);
userRouter.post("/favo-category", createUserFavoCategory);
userRouter.post("/filters", createOrUpdateUserFilter);
userRouter.post("/react", toggleUserPostEmotion);
userRouter.post("/inactive", setUsersInactive);
userRouter.post("/notification", createUserNotification);
userRouter.post("/notification/chat", createUserChatNotification);
userRouter.post("/notification/chat/email", sendUserChatNotificationEmail);


userRouter.get("/favo-category/:userId", getUserFavoCategoriesByUserId);
userRouter.get("/", getAllUsers);
userRouter.get("/some", getSomeUsers);
userRouter.get("/view", isAdminMiddleware, getUsersView);
userRouter.get("/user-statistics-view", getUserStatisticsView);
userRouter.get("/inactive", getBlockedUsers);
userRouter.get("/email", getUserByEmail);
userRouter.get("/:id", getUserById);
userRouter.get("/match/:matchedUserId", getMatchedUserById);
userRouter.get("/status/:userId", getUserStatusActions);
userRouter.get("/sessions/:userId", getUserSessions);
userRouter.get("/filters/:userId", getUserFilterById);
userRouter.get("/notification/:userId", getUserNotificationByUserId);
userRouter.get("/notification/chat/:userId", getUserChatNotificationsByUserId);


userRouter.put("/:userId", updateUser);
userRouter.put("/active/:userId", setUserActive);
userRouter.put("/status/:userId", updateUserStatus);
userRouter.put("/change-pw", changePassword);
userRouter.put("/summary/:userId", updateSummary);
userRouter.put("/notification/:userId", updateUserNotificationByUserId);
userRouter.put("/notification/chat/:userId", updateUserChatNotificationsByUserId);


userRouter.delete("/:id", deleteUser);
userRouter.delete("/favo-category/:categoryId", deleteUserFavoCategory);
userRouter.delete("/filters/:userId", deleteUserFilter);
userRouter.delete("/notification/:userId", deleteUserNotificationByUserId);
userRouter.delete("/notification/chat/:userId", deleteUserChatNotificationsByUserId);

export default userRouter;
