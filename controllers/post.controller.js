import { PrismaClient } from "@prisma/client";
import { newCommentEmailHTML } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/email.js";
import { decryptData } from "../utils/encryption.js";
const prisma = new PrismaClient();

// Create a new Post
export const createPost = async (req, res) => {
  const {
    userId,
    postType,
    rating,
    content,
    status,
    pId,
    targetId,
    imageFileId,
  } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        userId: Number(userId),
        postType,
        rating: Number(rating),
        content,
        status,
        pId: Number(pId),
        targetId: Number(targetId),
        imageFileId: Number(imageFileId),
      },
    });

    if (postType === "discussion" && pId > 0) {
      const targetPost = await prisma.post.findUnique({
        where: {
          id: pId,
        },
      });

      const existingUser = await prisma.user.findUnique({
        where: {
          id: targetPost.userId,
        },
      });
  
      const today = new Date();
      const existingUserBirthday = new Date(existingUser.birthday);
  
      await sendEmail({
        email: decryptData(existingUser.personalEmail) ? decryptData(existingUser.personalEmail) : decryptData(existingUser.email),
        subject: `New Comment From ${
          today.getFullYear() - existingUserBirthday.getFullYear()
        }${existingUser.sex === "male" ? 'M' : existingUser.sex === "female" ? 'F' : 'I'} at ${existingUser.college}`,
        html: newCommentEmailHTML(
          today.getFullYear() - existingUserBirthday.getFullYear(),
          existingUser.sex,
          existingUser.college,
          existingUser.discussionAvatar ? existingUser.discussionAvatar : existingUser.avatar,
          content
        ),
      });
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get discussions view
export const getDiscussionsView = async (req, res) => {
  try {
    const discussions = await prisma.discussionsView.findMany({
      where: { pId: 0 }
    });

    const decryptedDiscussions = discussions.map((discussion) => {
      try {
        let firstName = decryptData(discussion.user.split(" ")[0]);
        let lastName = decryptData(discussion.user.split(" ")[1]);
        return {
          ...discussion,
          user: firstName +' ' + lastName,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${discussion.id}:`, decryptError);
        return {
          ...discussion,
          user: "[DECRYPTION FAILED]",
        };
      }
    });

    res.status(200).json(decryptedDiscussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get discussions by categoryId
export const getDiscussionsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const discussions = await prisma.discussionsView.findMany({
      where: { categoryId: Number(categoryId) },
    });

    const decryptedDiscussions = discussions.map((discussion) => {
      try {
        let firstName = decryptData(discussion.user.split(" ")[0]);
        let lastName = decryptData(discussion.user.split(" ")[1]);
        return {
          ...discussion,
          user: firstName +' ' + lastName,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${discussion.id}:`, decryptError);
        return {
          ...discussion,
          user: "[DECRYPTION FAILED]",
        };
      }
    });

    // if (!discussions) {
    //   return res.status(404).json({ message: "Discussions not found" });
    // }

    res.status(200).json(decryptedDiscussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get discussion details
export const getDiscussionDetails = async (req, res) => {
  try {
    // Fetching discussion posts sorted by createdAt in descending order (most recent first)
    const discussionPosts = await prisma.post.findMany({
      where: {
        postType: "discussion",
        pId: 0
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt descending
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        targetId: true,
        imageFileId: true,
        pId: true, // Include pId to determine parent discussion ID for replies
      },
    });

    // Fetching user and category information
    const userIds = [...new Set(discussionPosts.map((post) => post.userId))];
    const targetIds = [
      ...new Set(discussionPosts.map((post) => post.targetId)),
    ];

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        discussionAvatar: true,
        birthday: true,
        sex: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          middleName: user.middleName ? decryptData(user.middleName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: targetIds },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching user emotions for each discussion post
    const postIds = discussionPosts.map((post) => post.id);
    const userEmotions = await prisma.userPostEmotion.findMany({
      where: {
        postId: { in: postIds },
      },
      select: {
        userId: true,
        postId: true,
        emotion: true,
      },
    });

    // Creating a map for faster lookup of emotions
    const emotionsMap = userEmotions.reduce((acc, emotion) => {
      const { postId, emotion: emotionType } = emotion;
      if (!acc[postId]) {
        acc[postId] = {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        };
      }
      // Increment the corresponding emotion count
      if (acc[postId][emotionType] !== undefined) {
        acc[postId][emotionType]++;
      }
      return acc;
    }, {});

    // Fetching reply counts for each discussion post
    const repliesCounts = await prisma.post.groupBy({
      by: ["pId"],
      _count: {
        id: true,
      },
      where: {
        pId: { in: postIds },
      },
    });

    // Creating a map for faster lookup of reply counts
    const repliesCountMap = repliesCounts.reduce((acc, reply) => {
      acc[reply.pId] = reply._count.id;
      return acc;
    }, {});

    // Fetching image file URLs for posts
    const imageFileIds = discussionPosts
      .map((post) => post.imageFileId)
      .filter((id) => id !== null); // Filter out null IDs
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Creating a map for faster lookup of image URLs
    const imageFileMap = imageFiles.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    // Combining the results
    const result = discussionPosts.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const category = categories.find((c) => c.id === post.targetId);
      const replyCount = repliesCountMap[post.id] || 0; // Get reply count or default to 0
      const imageUrl = post.imageFileId ? imageFileMap[post.imageFileId] : null;
      const emotions = emotionsMap[post.id] || {
        heart: 0,
        cry: 0,
        laugh: 0,
        dislike: 0,
        surprise: 0,
        love: 0,
        pray: 0,
      }; // Default to the structure if no emotions exist

      return {
        ...post,
        user,
        category,
        replyCount, // Add replyCount to the result
        imageUrl, // Add the image URL to the result
        ...emotions, // Add structured emotion counts to the result
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get discussion details
export const getDiscussionDetailsByUserId = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    // Fetching discussion posts sorted by createdAt in descending order (most recent first)
    const discussionPosts = await prisma.post.findMany({
      where: {
        postType: "discussion",
        userId: userId,
        pId: 0,
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt descending
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        targetId: true,
        imageFileId: true,
        pId: true, // Include pId to determine parent discussion ID for replies
      },
    });

    // Fetching user and category information
    const userIds = [...new Set(discussionPosts.map((post) => post.userId))];
    const targetIds = [
      ...new Set(discussionPosts.map((post) => post.targetId)),
    ];

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        discussionAvatar: true,
        birthday: true,
        sex: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          middleName: user.middleName ? decryptData(user.middleName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: targetIds },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching user emotions for each discussion post
    const postIds = discussionPosts.map((post) => post.id);
    const userEmotions = await prisma.userPostEmotion.findMany({
      where: {
        postId: { in: postIds },
      },
      select: {
        userId: true,
        postId: true,
        emotion: true,
      },
    });

    // Creating a map for faster lookup of emotions
    const emotionsMap = userEmotions.reduce((acc, emotion) => {
      const { postId, emotion: emotionType } = emotion;
      if (!acc[postId]) {
        acc[postId] = {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        };
      }
      // Increment the corresponding emotion count
      if (acc[postId][emotionType] !== undefined) {
        acc[postId][emotionType]++;
      }
      return acc;
    }, {});

    // Calculating total reactions for each post
    const totalReactionsMap = {};
    for (const postId in emotionsMap) {
      const emotions = emotionsMap[postId];
      totalReactionsMap[postId] = Object.values(emotions).reduce(
        (total, count) => total + count,
        0
      ); // Calculate total reactions
    }

    // Fetching reply counts for each discussion post
    const repliesCounts = await prisma.post.groupBy({
      by: ["pId"],
      _count: {
        id: true,
      },
      where: {
        pId: { in: postIds },
      },
    });

    // Creating a map for faster lookup of reply counts
    const repliesCountMap = repliesCounts.reduce((acc, reply) => {
      acc[reply.pId] = reply._count.id;
      return acc;
    }, {});

    // Fetching image file URLs for posts
    const imageFileIds = discussionPosts
      .map((post) => post.imageFileId)
      .filter((id) => id !== null); // Filter out null IDs
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Combining the results
    const result = discussionPosts.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const category = categories.find((c) => c.id === post.targetId);
      const replyCount = repliesCountMap[post.id] || 0; // Get reply count or default to 0

      const totalReactions = totalReactionsMap[post.id] || 0; // Get total reactions or default to 0

      return {
        ...post,
        discussion: post.content,
        user: user.firstName + " " + user.lastName,
        category: category.name,
        posted: post.createdAt,
        replies: replyCount, // Add replyCount to the result
        reactions: totalReactions, // Add total reactions count to the result
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getDiscussionDetailCommentsByUserId = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    // Fetching discussion posts sorted by createdAt in descending order (most recent first)
    const discussionPosts = await prisma.post.findMany({
      where: {
        postType: "discussion",
        userId: userId,
        pId: {
          not: 0,
        },
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt descending
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        targetId: true,
        imageFileId: true,
        pId: true, // Include pId to determine parent discussion ID for replies
      },
    });

    // Fetching user and category information
    const userIds = [...new Set(discussionPosts.map((post) => post.userId))];
    const targetIds = [
      ...new Set(discussionPosts.map((post) => post.targetId)),
    ];

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        discussionAvatar: true,
        birthday: true,
        sex: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: targetIds },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching user emotions for each discussion post
    const postIds = discussionPosts.map((post) => post.id);
    const userEmotions = await prisma.userPostEmotion.findMany({
      where: {
        postId: { in: postIds },
      },
      select: {
        userId: true,
        postId: true,
        emotion: true,
      },
    });

    // Creating a map for faster lookup of emotions
    const emotionsMap = userEmotions.reduce((acc, emotion) => {
      const { postId, emotion: emotionType } = emotion;
      if (!acc[postId]) {
        acc[postId] = {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        };
      }
      // Increment the corresponding emotion count
      if (acc[postId][emotionType] !== undefined) {
        acc[postId][emotionType]++;
      }
      return acc;
    }, {});

    // Calculating total reactions for each post
    const totalReactionsMap = {};
    for (const postId in emotionsMap) {
      const emotions = emotionsMap[postId];
      totalReactionsMap[postId] = Object.values(emotions).reduce(
        (total, count) => total + count,
        0
      ); // Calculate total reactions
    }

    // Fetching reply counts for each discussion post
    const repliesCounts = await prisma.post.groupBy({
      by: ["pId"],
      _count: {
        id: true,
      },
      where: {
        pId: { in: postIds },
      },
    });

    // Creating a map for faster lookup of reply counts
    const repliesCountMap = repliesCounts.reduce((acc, reply) => {
      acc[reply.pId] = reply._count.id;
      return acc;
    }, {});

    // Fetching image file URLs for posts
    const imageFileIds = discussionPosts
      .map((post) => post.imageFileId)
      .filter((id) => id !== null); // Filter out null IDs
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Combining the results
    const result = discussionPosts.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const category = categories.find((c) => c.id === post.targetId);
      const replyCount = repliesCountMap[post.id] || 0; // Get reply count or default to 0

      const totalReactions = totalReactionsMap[post.id] || 0; // Get total reactions or default to 0

      return {
        ...post,
        discussion: post.content,
        posted: post.createdAt,
        user: user.firstName + " " + user.lastName,
        category: category.name,
        replies: replyCount, // Add replyCount to the result
        reactions: totalReactions, // Add total reactions count to the result
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get discussion details
export const getDiscussionDetailsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const { sortBy } = req.query;

    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    await prisma.category.update({
      where: { id: Number(categoryId) },
      data: {
        views: category.views + 1,
      },
    });

    // Fetching discussion posts without initial sorting
    const discussionPosts = await prisma.post.findMany({
      where: {
        postType: "discussion",
        targetId: Number(categoryId),
        pId: 0,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        targetId: true,
        imageFileId: true,
        pId: true,
      },
    });

    // Fetching user and category information
    const userIds = [...new Set(discussionPosts.map((post) => post.userId))];
    const targetIds = [
      ...new Set(discussionPosts.map((post) => post.targetId)),
    ];

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        discussionAvatar: true,
        birthday: true,
        sex: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: targetIds },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching user emotions for each discussion post
    const postIds = discussionPosts.map((post) => post.id);
    const userEmotions = await prisma.userPostEmotion.findMany({
      where: {
        postId: { in: postIds },
      },
      select: {
        postId: true,
        emotion: true,
      },
    });

    // Creating a map for counting each type of emotion
    const emotionsMap = userEmotions.reduce((acc, emotion) => {
      const { postId, emotion: emotionType } = emotion;
      if (!acc[postId]) {
        acc[postId] = {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        };
      }
      // Increment the corresponding emotion count
      if (acc[postId][emotionType] !== undefined) {
        acc[postId][emotionType]++;
      }
      return acc;
    }, {});

    // Fetching reply counts for each discussion post
    const repliesCounts = await prisma.post.groupBy({
      by: ["pId"],
      _count: {
        id: true,
      },
      where: {
        pId: { in: postIds },
      },
    });

    // Creating a map for faster lookup of reply counts
    const repliesCountMap = repliesCounts.reduce((acc, reply) => {
      acc[reply.pId] = reply._count.id;
      return acc;
    }, {});

    // Fetching image file URLs for posts
    const imageFileIds = discussionPosts
      .map((post) => post.imageFileId)
      .filter((id) => id !== null);
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Creating a map for faster lookup of image URLs
    const imageFileMap = imageFiles.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    // Combining the results with reply counts, total reactions, emotions, and image URLs
    let result = discussionPosts.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const category = categories.find((c) => c.id === post.targetId);
      const replyCount = repliesCountMap[post.id] || 0; // Get reply count or default to 0

      // Get the emotions structure for the current post
      const emotions = emotionsMap[post.id] || {
        heart: 0,
        cry: 0,
        laugh: 0,
        dislike: 0,
        surprise: 0,
        love: 0,
        pray: 0,
      };

      // Calculate total reactions based on the emotions counted
      const totalReactions = Object.values(emotions).reduce(
        (total, count) => total + count,
        0
      );

      // Get the image URL if it exists
      const imageFileUrl = post.imageFileId
        ? imageFileMap[post.imageFileId]
        : null;

      return {
        ...post,
        user,
        category,
        replyCount, // Add replyCount to the result
        totalReactions, // Add totalReactions to the result
        imageFileUrl, // Add imageUrl to the result
        ...emotions, // Add structured emotion counts to the result
      };
    });

    // Sorting the result based on the sortBy parameter
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt descending
        break;
      case "comments":
        result.sort((a, b) => b.replyCount - a.replyCount); // Sort by reply count descending
        break;
      case "reactions":
        result.sort((a, b) => b.totalReactions - a.totalReactions); // Sort by total reactions descending
        break;
      default:
        result.sort((a, b) => b.createdAt - a.createdAt); // Default to descending order by createdAt
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// export const getPostDetail = async (req, res) => {
//   const discussionId = parseInt(req.params.discussionId); // Extract post ID from request parameters

//   if (isNaN(discussionId)) {
//     return res.status(400).json({ error: "Invalid post ID" });
//   }

//   try {
//     // Fetching the post data
//     const post = await prisma.post.findUnique({
//       where: { id: Number(discussionId) },
//       select: {
//         id: true,
//         userId: true,
//         postType: true,
//         content: true,
//         targetId: true,
//         pId: true,
//         imageFileId: true, // Fetching imageFileId for later use
//         createdAt: true, // Adding createdAt for the post
//         updatedAt: true, // Adding updatedAt for the post
//       },
//     });

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // Fetching user data for the main post
//     const postUser = await prisma.user.findUnique({
//       where: { id: post.userId },
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         avatar: true,
//         discussionAvatar: true,
//         sex: true,
//         birthday: true,
//         college: true,
//       },
//     });

//     // Fetching image URL for the main post
//     const imageFileUrl = post.imageFileId
//       ? await prisma.file.findUnique({
//           where: { id: post.imageFileId },
//           select: { fileUrl: true },
//         })
//       : null;

//     // Fetching category data using targetId
//     const category = post.targetId
//       ? await prisma.category.findUnique({
//           where: { id: post.targetId },
//           select: {
//             id: true,
//             name: true,
//           },
//         })
//       : null;

//     // Function to fetch all replies (including grandchildren) in a linear fashion
//     const fetchAllReplies = async (parentId) => {
//       const replies = await prisma.post.findMany({
//         where: {
//           pId: parentId, // Match posts where pId matches the parent post id
//           postType: "discussion",
//         },
//         orderBy: {
//           createdAt: "desc", // Sort by createdAt in descending order
//         },
//         select: {
//           id: true,
//           userId: true,
//           postType: true,
//           content: true,
//           targetId: true,
//           createdAt: true,
//           updatedAt: true,
//           imageFileId: true, // Fetching imageFileId for reply
//           pId: true, // Ensure pId is included
//         },
//       });

//       const allReplies = [];

//       for (const reply of replies) {
//         // Fetching image URL for reply
//         const replyImageFileUrl = reply.imageFileId
//           ? await prisma.file.findUnique({
//               where: { id: reply.imageFileId },
//               select: { fileUrl: true },
//             })
//           : null;

//         // Fetching emotion counts for the reply
//         const replyEmotionCounts = await prisma.userPostEmotion.groupBy({
//           by: ["emotion"],
//           _count: {
//             emotion: true,
//           },
//           where: {
//             postId: reply.id,
//           },
//         });

//         // Creating a map for emotion counts for the reply
//         const replyEmotionCountMap = {
//           heart: 0,
//           cry: 0,
//           laugh: 0,
//           dislike: 0,
//           surprise: 0,
//           love: 0,
//           pray: 0,
//         };

//         // Populate the counts for the reply
//         replyEmotionCounts.forEach((item) => {
//           const emotionKey = item.emotion;
//           if (replyEmotionCountMap.hasOwnProperty(emotionKey)) {
//             replyEmotionCountMap[emotionKey] = item._count.emotion;
//           }
//         });

//         // Fetching user data for the reply
//         const replyUser = await prisma.user.findUnique({
//           where: { id: reply.userId },
//           select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             avatar: true,
//             sex: true,
//             birthday: true,
//             college: true,
//           },
//         });

//         // Fetch the count of direct replies to the current reply
//         const replyCount = await prisma.post.count({
//           where: {
//             pId: reply.id,
//             postType: "discussion",
//           },
//         });

//         // Add the current reply to the linear list
//         allReplies.push({
//           ...reply,
//           imageFileUrl: replyImageFileUrl ? replyImageFileUrl.fileUrl : null,
//           user: replyUser,
//           isReply: true,
//           replyCount, // Include replyCount for the current reply
//           ...replyEmotionCountMap,
//         });

//         // Fetch grandchildren replies recursively
//         const grandchildrenReplies = await fetchAllReplies(reply.id);

//         // Add grandchildren replies to the linear list
//         allReplies.push(...grandchildrenReplies);
//       }

//       return allReplies; // Return all replies in a linear structure
//     };

//     // Fetching all replies for the main post
//     const allReplies = await fetchAllReplies(post.id);

//     // Constructing the final response with both post and replies
//     const response = {
//       post: {
//         id: post.id,
//         userId: post.userId,
//         postType: post.postType,
//         content: post.content,
//         targetId: post.targetId,
//         pId: post.pId, // Include pId for the main post
//         imageFileUrl: imageFileUrl ? imageFileUrl.fileUrl : null, // Include imageFileUrl for the main post
//         categoryId: category ? category.id : 0, // Include category ID
//         categoryName: category ? category.name : "", // Include category Name
//       },
//       replies: [
//         {
//           id: post.id,
//           userId: post.userId,
//           postType: post.postType,
//           content: post.content,
//           imageFileUrl: imageFileUrl ? imageFileUrl.fileUrl : null, // Include imageFileUrl for the main post
//           targetId: post.targetId,
//           pId: post.pId, // Include pId for the main post
//           createdAt: post.createdAt, // Adding createdAt for the post
//           updatedAt: post.updatedAt,
//           user: postUser, // Include user data for the post
//           isReply: true, // Indicate that this is the main post
//           replyCount: allReplies.length, // Count of all replies
//           heart: 0, // Placeholder for emotion counts
//           cry: 0,
//           laugh: 0,
//           dislike: 0,
//           surprise: 0,
//           love: 0,
//           pray: 0,
//         },
//         ...allReplies.map((reply) => ({
//           ...reply,
//         })), // Ensure each reply has its pId
//       ],
//     };

//     res.json(response); // Return the response structure
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const getPostDetail = async (req, res) => {
  const discussionId = parseInt(req.params.discussionId); // Extract post ID from request parameters

  if (isNaN(discussionId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    // Fetching the post data
    const post = await prisma.post.findUnique({
      where: { id: Number(discussionId), pId: 0 },
      select: {
        id: true,
        userId: true,
        postType: true,
        content: true,
        targetId: true,
        pId: true,
        imageFileId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Fetching user data for the main post
    const postUser = await prisma.user.findUnique({
      where: { id: post.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        discussionAvatar: true,
        sex: true,
        birthday: true,
        college: true,
      },
    });

    const decryptedPostUser = {
      ...postUser,
      firstName: postUser.firstName ? decryptData(postUser.firstName) : null,
      lastName: postUser.lastName ? decryptData(postUser.lastName) : null,
      email: postUser.email ? decryptData(postUser.email) : null,
    };

    // Fetching image URL for the main post
    const imageFileUrl = post.imageFileId
      ? await prisma.file.findUnique({
          where: { id: post.imageFileId },
          select: { fileUrl: true },
        })
      : null;

    // Fetching category data using targetId
    const category = post.targetId
      ? await prisma.category.findUnique({
          where: { id: post.targetId },
          select: {
            id: true,
            name: true,
          },
        })
      : null;

    // Fetch emotions for the main post
    const mainPostEmotions = await prisma.userPostEmotion.findMany({
      where: {
        postId: post.id,
      },
      select: {
        postId: true,
        emotion: true,
      },
    });

    // Create emotions structure for main post
    const mainPostEmotionCounts = mainPostEmotions.reduce((acc, emotion) => {
      const { emotion: emotionType } = emotion;
      if (acc[emotionType] !== undefined) {
        acc[emotionType]++;
      }
      return acc;
    }, {
      heart: 0,
      cry: 0,
      laugh: 0,
      dislike: 0,
      surprise: 0,
      love: 0,
      pray: 0,
    });

    // Calculate total reactions for main post
    const mainPostTotalReactions = Object.values(mainPostEmotionCounts).reduce(
      (total, count) => total + count,
      0
    );

    // Function to fetch all replies (including grandchildren) in a linear fashion
    const fetchAllReplies = async (parentId) => {
      const replies = await prisma.post.findMany({
        where: {
          pId: parentId,
          postType: "discussion",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          userId: true,
          postType: true,
          content: true,
          targetId: true,
          createdAt: true,
          updatedAt: true,
          imageFileId: true,
          pId: true,
        },
      });

      const allReplies = [];

      for (const reply of replies) {
        // Fetching image URL for reply
        const replyImageFileUrl = reply.imageFileId
          ? await prisma.file.findUnique({
              where: { id: reply.imageFileId },
              select: { fileUrl: true },
            })
          : null;

        // Fetch emotions for the reply
        const replyEmotions = await prisma.userPostEmotion.findMany({
          where: {
            postId: reply.id,
          },
          select: {
            postId: true,
            emotion: true,
          },
        });

        // Create emotions structure for reply
        const replyEmotionCounts = replyEmotions.reduce((acc, emotion) => {
          const { emotion: emotionType } = emotion;
          if (acc[emotionType] !== undefined) {
            acc[emotionType]++;
          }
          return acc;
        }, {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        });

        // Calculate total reactions for reply
        const replyTotalReactions = Object.values(replyEmotionCounts).reduce(
          (total, count) => total + count,
          0
        );

        // Fetching user data for the reply
        const replyUser = await prisma.user.findUnique({
          where: { id: reply.userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            discussionAvatar: true,
            sex: true,
            birthday: true,
            college: true,
          },
        });

        const decryptedReplyUser = {
          ...replyUser,
          firstName: replyUser.firstName ? decryptData(replyUser.firstName) : null,
          lastName: replyUser.lastName ? decryptData(replyUser.lastName) : null,
          email: replyUser.email ? decryptData(replyUser.email) : null,
        };

        // Fetch the count of direct replies to the current reply
        const replyCount = await prisma.post.count({
          where: {
            pId: reply.id,
            postType: "discussion",
          },
        });

        // Add the current reply to the linear list
        allReplies.push({
          ...reply,
          imageFileUrl: replyImageFileUrl ? replyImageFileUrl.fileUrl : null,
          user: decryptedReplyUser,
          isReply: true,
          replyCount,
          ...replyEmotionCounts,
          totalReactions: replyTotalReactions,
        });

        // Fetch grandchildren replies recursively
        const grandchildrenReplies = await fetchAllReplies(reply.id);
        allReplies.push(...grandchildrenReplies);
      }

      return allReplies;
    };

    // Fetching all replies for the main post
    const allReplies = await fetchAllReplies(post.id);

    // Constructing the final response with both post and replies
    const response = {
      post: {
        id: post.id,
        userId: post.userId,
        postType: post.postType,
        content: post.content,
        targetId: post.targetId,
        pId: post.pId,
        imageFileUrl: imageFileUrl ? imageFileUrl.fileUrl : null,
        categoryId: category ? category.id : 0,
        categoryName: category ? category.name : "",
      },
      replies: [
        {
          id: post.id,
          userId: post.userId,
          postType: post.postType,
          content: post.content,
          imageFileUrl: imageFileUrl ? imageFileUrl.fileUrl : null,
          targetId: post.targetId,
          pId: post.pId,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          user: decryptedPostUser,
          isReply: true,
          replyCount: allReplies.length,
          ...mainPostEmotionCounts,
          totalReactions: mainPostTotalReactions,
        },
        ...allReplies.map((reply) => ({
          ...reply,
        })),
      ],
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const searchDiscussionDetails = async (req, res) => {
  try {
    const { query, categoryId, sortBy } = req.query; // Get the search query, categoryId, and sortBy from the request

    // Construct the where clause for the search
    const whereClause = {
      postType: "discussion",
      content: {
        contains: query, // Filter posts containing the search query
      },
    };

    // If categoryId is provided, filter by it
    if (categoryId) {
      whereClause.targetId = Number(categoryId); // Ensure categoryId is a number
    }

    // Fetching discussion posts that match the search query and optional categoryId
    const discussionPosts = await prisma.post.findMany({
      where: whereClause,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        targetId: true,
        imageFileId: true,
        pId: true, // Include pId to determine parent discussion ID for replies
      },
    });

    // Fetching user and category information
    const userIds = [...new Set(discussionPosts.map((post) => post.userId))];
    const targetIds = [
      ...new Set(discussionPosts.map((post) => post.targetId)),
    ];

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        discussionAvatar: true,
        birthday: true,
        sex: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: targetIds },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching reply counts for each discussion post
    const discussionIds = discussionPosts.map((post) => post.id);
    const repliesCounts = await prisma.post.groupBy({
      by: ["pId"],
      _count: {
        id: true,
      },
      where: {
        pId: { in: discussionIds },
      },
    });

    // Creating a map for faster lookup of reply counts
    const repliesCountMap = repliesCounts.reduce((acc, reply) => {
      acc[reply.pId] = reply._count.id;
      return acc;
    }, {});

    // Fetching image file URLs for posts
    const imageFileIds = discussionPosts
      .map((post) => post.imageFileId)
      .filter((id) => id !== null); // Filter out null IDs
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Creating a map for faster lookup of image URLs
    const imageFileMap = imageFiles.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    // Combining the results
    const result = discussionPosts.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const category = categories.find((c) => c.id === post.targetId);
      const replyCount = repliesCountMap[post.id] || 0; // Get reply count or default to 0

      // Get the image URL if it exists
      const imageUrl = post.imageFileId ? imageFileMap[post.imageFileId] : null;

      return {
        ...post,
        user,
        category,
        replyCount, // Add replyCount to the result
        imageUrl, // Add the image URL to the result
      };
    });

    // Sorting the results based on sortBy parameter
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt descending
        break;
      case "comments":
        result.sort((a, b) => repliesCountMap[b.id] - repliesCountMap[a.id]); // Sort by reply count descending
        break;
      case "reactions":
        const totalReactions = (post) =>
          post.emotionHearts +
          post.emotionCries +
          post.emotionLaughes +
          post.emotionDislikes +
          post.emotionSurprises +
          post.emotionLoves +
          post.emotionPraies;

        result.sort((a, b) => totalReactions(b) - totalReactions(a)); // Sort by total reactions descending
        break;
      default:
        result.sort((a, b) => b.createdAt - a.createdAt); // Default to sorting by most recent
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get discussions by userId
export const getDiscussionsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const discussions = await prisma.discussionsView.findMany({
      where: { userId: Number(userId), pId: 0 },
    });

    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reply discussions by userId
export const getReplyDiscussionsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch discussions where pId is NOT 0
    const discussions = await prisma.discussionsView.findMany({
      where: {
        userId: Number(userId),
        pId: {
          not: 0, // This ensures pId is NOT 0
        },
      },
    });

    // Return the discussions
    res.status(200).json(discussions);
  } catch (error) {
    // Handle any potential errors
    res.status(500).json({ error: error.message });
  }
};

// Get reply discussions by discussionId
export const getReplyDiscussionsById = async (req, res) => {
  const { discussionId } = req.params;

  try {
    // Fetch discussions where pId matches the given discussionId
    const discussions = await prisma.post.findMany({
      where: {
        postType: "discussion", // Ensure we only fetch discussions
        pId: Number(discussionId), // Match pId with the given discussionId
      },
    });

    // Return 404 if no discussions found
    if (discussions.length === 0) {
      return res.status(404).json({ message: "Reply discussions not found" });
    }

    // Extract unique userIds from the discussions
    const userIds = [...new Set(discussions.map((post) => post.userId))];

    // Fetch user details for all unique userIds
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds }, // Fetch only the users associated with the posts
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        avatar: true,
        discussionAvatar: true,
        sex: true,
        birthday: true,
        college: true,
      },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          middleName: user.middleName ? decryptData(user.middleName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    // Define the emotion counts structure
    const emotionCountMapTemplate = {
      heart: 0,
      cry: 0,
      laugh: 0,
      dislike: 0,
      surprise: 0,
      love: 0,
      pray: 0,
    };

    // Fetch emotion reaction counts for each discussion
    const emotionCounts = await prisma.userPostEmotion.groupBy({
      by: ["postId", "emotion"],
      _count: {
        emotion: true,
      },
      where: {
        postId: { in: discussions.map((post) => post.id) }, // Match postId with discussions
      },
    });

    // Create a map of total emotion counts by postId
    const emotionCountByPost = {};
    emotionCounts.forEach(({ postId, emotion, _count }) => {
      if (!emotionCountByPost[postId]) {
        emotionCountByPost[postId] = { ...emotionCountMapTemplate };
      }
      emotionCountByPost[postId][emotion] = _count.emotion; // Increment specific emotion count
    });

    // Map user data and emotion counts to their corresponding discussions
    const discussionsWithUser = discussions.map((post) => {
      const user = decryptedUsers.find((u) => u.id === post.userId);
      const emotions = emotionCountByPost[post.id] || emotionCountMapTemplate;
      return {
        ...post,
        user: user || null, // Include user info if exists, otherwise null
        ...emotions, // Get counts or default
      };
    });

    res.status(200).json(discussionsWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews view
export const getReviewsView = async (req, res) => {
  try {
    const reviews = await prisma.reviewsView.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a review view with its response by Id
export const getReviewViewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await prisma.reviewsView.findUnique({
      where: { id: Number(reviewId) },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    let response;
    if (review.responseId === null) {
      response = null;
    } else {
      response = await prisma.reviewsView.findUnique({
        where: { id: review.responseId },
      });
    }

    const result = {
      ...review,
      response,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter

  try {
    // Fetch the user by userId to get their email
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        firstName: true, // Select the firstName field
        lastName: true, // Select the lastName field
        email: true,
        avatar: true, // Select the avatar field
        discussionAvatar: true,
        sex: true, // Select the sex field
        college: true, // Select the college field
      }, // Only fetch the email field
    });

    const decryptedUser = {
      ...user,
      firstName: user.firstName ? decryptData(user.firstName) : null,
      lastName: user.lastName ? decryptData(user.lastName) : null,
      email: user.email ? decryptData(user.email) : null,
    };

    // If user doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find matches associated with the user's email
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ email1: decryptedUser.email }, { email2: decryptedUser.email }],
      },
    });

    // Map matches to get matched users and their statuses
    const matchedUsersData = matches.map((match) => {
      return {
        email: match.email1 === decryptedUser.email ? match.email2 : match.email1,
        status:
          match.email1 === decryptedUser.email ? match.email1Status : match.email2Status,
      };
    });

    // Fetch users based on matched emails, selecting specific fields
    const matchedUsers = await prisma.user.findMany({
      where: {
        email: {
          in: matchedUsersData.map((data) => data.email),
        },
      },
      select: {
        id: true, // Select the id field
        firstName: true, // Select the firstName field
        lastName: true, // Select the lastName field
        email: true, // Select the email field
        avatar: true, // Select the avatar field
        discussionAvatar: true,
        sex: true, // Select the sex field
        college: true, // Select the college field
      },
    });

    const decryptedMatchedUsers = matchedUsers.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          email: user.email ? decryptData(user.email) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
        };
      }
    });

    // Calculate reviews and ratings for each matched user
    const usersWithReviews = await Promise.all(
      decryptedMatchedUsers.map(async (matchedUser) => {
        // Fetch reviews that the given user left for matched users
        const userReviews = await prisma.post.findMany({
          where: {
            targetId: matchedUser.id, // Match the targetId with the matched user's id
            postType: "review", // Only include review posts
            userId: user.id, // Ensure the post is from the requesting user
          },
          select: {
            id: true,
            rating: true, // Select the rating field
            content: true, // Select the content field for the review
            createdAt: true,
          },
        });

        // Fetch reviews that the matched user left for the given user
        const matchedUserReviews = await prisma.post.findMany({
          where: {
            targetId: user.id, // Match the targetId with the user's id
            postType: "review", // Only include review posts
            userId: matchedUser.id, // Ensure the post is from the matched user
          },
          select: {
            id: true,
            rating: true, // Select the rating field
            content: true, // Select the content field for the review
            createdAt: true,
          },
        });

        // Calculate the average rating from the reviews the given user left
        const userRating = userReviews.length > 0 ? userReviews[0].rating : 0; // If no posts, averageRating will be 0

        const matchedUserRating =
          matchedUserReviews.length > 0 ? matchedUserReviews[0].rating : 0; // If no posts, averageRating will be 0

        return {
          userReview: {
            ...decryptedUser,
            reviewId: userReviews.length > 0 ? userReviews[0].id : 0,
            rating: userRating, // Attach the average rating of the review left by the user
            content: userReviews.length > 0 ? userReviews[0].content : "", // Fetch content of the first review if exists
            createdAt: userReviews.length > 0 ? userReviews[0].createdAt : "", // Fetch content of the first review if exists
          },
          matchedUserReview: {
            ...matchedUser,
            reviewId:
              matchedUserReviews.length > 0 ? matchedUserReviews[0].id : 0,
            rating: matchedUserRating,
            content:
              matchedUserReviews.length > 0
                ? matchedUserReviews[0].content
                : "",
            createdAt:
              matchedUserReviews.length > 0
                ? matchedUserReviews[0].createdAt
                : "",
          },
        };
      })
    );

    res.status(200).json(usersWithReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single Post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    // if (!post) {
    //   return res.status(404).json({ message: "Post not found" });
    // }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId, postType, rating, content, status, pId, targetId } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        userId: Number(userId),
        postType,
        rating: Number(rating),
        content,
        status,
        pId: Number(pId),
        targetId: Number(targetId),
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle status for a specific post
export const togglePostStatus = async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the post by ID
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Toggle the status
    const newStatus = post.status === "active" ? "inactive" : "active";

    // Update the post status
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: { status: newStatus },
    });

    // Return the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
