import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all question types
export const getAllQuestionTypes = async (req, res) => {
  try {
    const questionTypes = await prisma.questionType.findMany();
    res.status(200).json(questionTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single question type by ID
export const getQuestionTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const questionType = await prisma.questionType.findUnique({
      where: { id: Number(id) },
    });
    if (questionType) {
      res.status(200).json(questionType);
    } else {
      res.status(404).json({ error: "Question type not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.questionPrices.findMany();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
    });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: "Question not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all question values
export const getAllQuestionValues = async (req, res) => {
  try {
    const questionValues = await prisma.questionValue.findMany();
    res.status(200).json(questionValues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single question value by ID
export const getQuestionValueById = async (req, res) => {
  const { id } = req.params;
  try {
    const questionValue = await prisma.questionValue.findUnique({
      where: { id: Number(id) },
    });
    if (questionValue) {
      res.status(200).json(questionValue);
    } else {
      res.status(404).json({ error: "Question value not found." });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update a question's price by ID
export const updateQuestionPrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  // Validate input
  if (typeof Number(price) !== "number" || Number(price) < 0) {
    return res.status(400).json({ error: "Please provide a valid price." });
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
    });
    if (question) {
      const updatedQuestion = await prisma.question.update({
        where: { id: Number(id) },
        data: { price: Number(price) },
      });

      res.status(200).json(updatedQuestion);
    } else {
      res.status(404).json({ error: "Question not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update question prices based on an array of {id, price} objects
export const updateQuestionPrices = async (req, res) => {
  const { questions } = req.body; // Expecting an array of { id, price } objects

  // Validate input
  if (!Array.isArray(questions) || questions.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide an array of questions to update." });
  }

  const updatePromises = questions.map(async (item) => {
    const { id, price } = item;

    // Validate each item's price
    if (typeof Number(price) !== "number" || Number(price) < 0 || !id) {
      return { id, error: "Please provide a valid id and a valid price." };
    }

    try {
      const question = await prisma.questionPrices.findUnique({
        where: { id: Number(id) },
      });

      if (!question) {
        return { id, error: "Question not found." };
      }

      const updatedQuestion = await prisma.questionPrices.update({
        where: { id: Number(id) },
        data: { price: Number(price) },
      });

      return { id: updatedQuestion.id, updatedPrice: updatedQuestion.price };
    } catch (error) {
      return { id, error: error.message };
    }
  });

  // Execute all update promises
  const results = await Promise.all(updatePromises);

  // Filter out successes and errors
  const errors = results.filter((result) => result.error);
  const successes = results.filter((result) => !result.error);

  // Send a response
  res.status(200).json({
    successes,
    errors,
  });
};
