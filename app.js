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

import questionnareData from "./data/data.js";
import { userQuestionCompletedEmailHTML } from "./utils/emailTemplate.js";


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan("dev"));

passport.use(passportJWTStrategy);

app.use("/api/test", (req, res) => {
    const qa = [
        {
            "answer": "f-boyish",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 4,
            "gIndex": 0,
            "toggle": true
        },
        {
            "answer": "123",
            "qIndex": 0,
            "sIndex": 0,
            "pIndex": 0,
            "gIndex": 0,
            "toggle": true
        },
        {
            "answer": "123",
            "qIndex": 0,
            "sIndex": 0,
            "pIndex": 1,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "123",
            "qIndex": 0,
            "sIndex": 0,
            "pIndex": 2,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "123",
            "qIndex": 0,
            "sIndex": 0,
            "pIndex": 3,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "01/01/2000",
            "qIndex": 0,
            "sIndex": 1,
            "pIndex": 0,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Female",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 0,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Blue",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 1,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Light blonde",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 2,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Blonde",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 3,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Less than 5′ ft (Less than 152 cm)",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 5,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Less than 90 lb (Less than 41 kg)",
            "qIndex": 0,
            "sIndex": 2,
            "pIndex": 6,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Very masculine",
            "qIndex": 1,
            "sIndex": 0,
            "pIndex": 0,
            "gIndex": 0,
            "toggle": false
        },
        {
            "answer": "Yes",
            "qIndex": 1,
            "sIndex": 0,
            "pIndex": 1,
            "gIndex": 0,
            "toggle": false
        },
    ];
    userQuestionCompletedEmailHTML(qa, "test@gmail.com", "John", "Rev", "Doe");    
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
