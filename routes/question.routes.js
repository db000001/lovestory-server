import express from "express";
import { requireUserAuth } from "../middleware/authMiddleware.js";
import {
  getAllQuestionTypes,
  getAllQuestionValues,
  getAllQuestions,
  getQuestionById,
  getQuestionTypeById,
  getQuestionValueById,
  updateQuestionPrice,
  updateQuestionPrices,
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

// questionRouter.use(requireUserAuth);

questionRouter.get("/type", getAllQuestionTypes);
questionRouter.get("/type/:id", getQuestionTypeById);

questionRouter.get("/question", getAllQuestions);
questionRouter.get("/question/:id", getQuestionById);
questionRouter.put("/question/change-price/:id", updateQuestionPrice);
questionRouter.post("/question/change-prices", updateQuestionPrices);

questionRouter.get("/value", getAllQuestionValues);
questionRouter.get("/value/:id", getQuestionValueById);

export default questionRouter;
