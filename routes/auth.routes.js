import express from "express";

import {
  register,
  login,
  refresh,
  logout,
  confirmEmail,
  resetPwd,
  forgotPassword,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.patch("/confirm-email/:token", confirmEmail);
authRouter.patch("/forgot-pwd", forgotPassword);
authRouter.patch("/reset-pwd", resetPwd);

export default authRouter;
