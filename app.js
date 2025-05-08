import { config } from "dotenv";
config();

import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import collegeRouter from "./routes/college.routes.js";
import categoryRouter from "./routes/category.routes.js";
import postRouter from "./routes/post.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import videoRouter from "./routes/video.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import miscellaneousRouter from "./routes/miscellaneous.routes.js";

import passportJWTStrategy from "./config/passport.js";
import { errorHandler } from "./middleware/errorHandler.js";
import matchRouter from "./routes/match.routes.js";
import questionRouter from "./routes/question.routes.js";

import { PrismaClient } from "@prisma/client";
import { userQuestionCompletedEmailHTML } from "./utils/emailTemplate.js";
import { sendEmail } from "./utils/email.js";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan("dev"));

passport.use(passportJWTStrategy);

app.use("/api/test", async (req, res) => {
  const qa = await prisma.userQA.findMany({
    where: { userId: 56 },
  });

  await sendEmail({
    email: "devops654321@gmail.com",
    subject: `QA creation test`,
    html: userQuestionCompletedEmailHTML(
      qa,
      "devops654321@gmail.com",
      "dev",
      "middle",
      "ops"
    ),
  });

  res.status(200).json({ message: "Success!" });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/colleges", collegeRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/collections", collectionRouter);
app.use("/api/videos", videoRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/matches", matchRouter);
app.use("/api/miscellaneous", miscellaneousRouter);
app.use("/api/questions", questionRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
