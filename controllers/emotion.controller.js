import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new PostEmotion
export const createPostEmotion = async (req, res) => {
  const { postId, emotionId, userId } = req.body;

  try {
    const newPostEmotion = await prisma.postEmotion.create({
      data: {
        postId,
        emotionId,
        userId,
      },
    });
    res.status(201).json(newPostEmotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all PostEmotions
export const getAllPostEmotions = async (req, res) => {
  try {
    const postEmotions = await prisma.postEmotion.findMany();
    res.status(200).json(postEmotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PostEmotion by ID
export const getPostEmotionById = async (req, res) => {
  const { id } = req.params;

  try {
    const postEmotion = await prisma.postEmotion.findUnique({
      where: { id: Number(id) },
    });
    if (postEmotion) {
      res.status(200).json(postEmotion);
    } else {
      res.status(404).json({ error: "PostEmotion not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PostEmotion by ID
export const updatePostEmotion = async (req, res) => {
  const { id } = req.params;
  const { postId, emotionId, userId } = req.body;

  try {
    const updatedPostEmotion = await prisma.postEmotion.update({
      where: { id: Number(id) },
      data: {
        postId,
        emotionId,
        userId,
      },
    });
    res.status(200).json(updatedPostEmotion);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "PostEmotion not found." });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a PostEmotion by ID
export const deletePostEmotion = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.postEmotion.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "PostEmotion not found." });
    }
    res.status(500).json({ error: error.message });
  }
};
