import { PrismaClient } from "@prisma/client";
import { decryptData } from "../utils/encryption.js";

const prisma = new PrismaClient();

export const createVideo = async (req, res) => {
  const {
    title,
    description,
    tag1,
    tag2,
    tag3,
    collectionName,
    imageFileId,
    videoFileId,
    status,
  } = req.body;

  try {
    // Check if the collection exists
    let collection = await prisma.collection.findUnique({
      where: {
        name: collectionName,
      },
    });

    // If the collection does not exist, create it
    if (!collection) {
      collection = await prisma.collection.create({
        data: {
          name: collectionName,
          // You can set other fields like collectionOrder, description, etc. if needed
        },
      });
    }

    // Create the video associated with the collection
    const video = await prisma.video.create({
      data: {
        title,
        description,
        tag1,
        tag2,
        tag3,
        collectionId: collection.id, // Associate video with the collection
        imageFileId: Number(imageFileId),
        videoFileId: Number(videoFileId),
        status,
      },
    });

    return res.status(201).json({
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the video",
      error: error.message,
    });
  }
};

// Get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany();
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching videos",
      error: error.message,
    });
  }
};

// Get videos view
export const getVideosView = async (req, res) => {
  try {
    const videos = await prisma.videosView.findMany();

    // Use Promise.all to await all async operations in the map
    const videosWithLikes = await Promise.all(
      videos.map(async (video) => {
        const totalLikes = await prisma.userVideoLikes.count({
          where: {
            videoId: video.id,
          },
        });

        // Return a new object with the likes property added
        return {
          ...video,
          likes: totalLikes,
        };
      })
    );

    return res.status(200).json(videosWithLikes);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching videos view",
      error: error.message,
    });
  }
};

// Get videos viwe by collection
export const getVideosViewByCollection = async (req, res) => {
  const { collectionId } = req.params;

  try {
    const videos = await prisma.videosView.findMany({
      where: { collectionId: Number(collectionId) },
    });

    if (!videos) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Use Promise.all to await all async operations in the map
    const videosWithLikes = await Promise.all(
      videos.map(async (video) => {
        const totalLikes = await prisma.userVideoLikes.count({
          where: {
            videoId: video.id,
          },
        });

        // Return a new object with the likes property added
        return {
          ...video,
          likes: totalLikes,
        };
      })
    );

    return res.status(200).json(videosWithLikes);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching video",
      error: error.message,
    });
  }
};

// Get videos detail viwe
export const getVideosDetailView = async (req, res) => {
  try {
    const videos = await prisma.videosDetailView.findMany();
    // Fetch all related CategoryVisibility records
    const allVisibilityRecords = await prisma.collectionVisibility.findMany();

    // Combine videos with their visibility records
    const videosWithVisibility = videos.map((video) => {
      // Filter visibility records for the current video
      const visibilityRecords = allVisibilityRecords.filter(
        (vis) => vis.collectionId === video.collectionId
      );
      return {
        ...video,
        collectionVisibility: visibilityRecords,
      };
    });
    return res.status(200).json(videosWithVisibility);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching video or related comments",
      error: error.message,
    });
  }
};

// Get videos detail by group
export const getVideoDetailsWithStructured = async (req, res) => {
  try {
    // Fetching all videos
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        collectionId: true,
        tag1: true,
        tag2: true,
        tag3: true,
        imageFileId: true,
        videoFileId: true,
        createdAt: true,
        updatedAt: true,
        views: true, // Assuming a field for popularity
      },
    });

    // Fetch all related CategoryVisibility records
    const allVisibilityRecords = await prisma.collectionVisibility.findMany();

    // Combine videos with their visibility records
    const videosWithVisibility = videos.map((video) => {
      // Filter visibility records for the current video
      const visibilityRecords = allVisibilityRecords.filter(
        (vis) => vis.collectionId === video.collectionId
      );
      return {
        ...video,
        collectionVisibility: visibilityRecords,
      };
    });

    // Fetching collections
    const collections = await prisma.collection.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    // Fetching image and video file URLs for the videos
    const imageFileIds = videosWithVisibility
      .map((video) => video.imageFileId)
      .filter((id) => id !== null);

    const videoFileIds = videosWithVisibility
      .map((video) => video.videoFileId)
      .filter((id) => id !== null);

    // Fetching image files
    const imageFiles = await prisma.file.findMany({
      where: {
        id: { in: imageFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Fetching video files
    const videoFiles = await prisma.file.findMany({
      where: {
        id: { in: videoFileIds },
      },
      select: {
        id: true,
        fileUrl: true,
      },
    });

    // Creating maps for faster lookup of file URLs
    const imageFileMap = imageFiles.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    const videoFileMap = videoFiles.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    // Adding collection names to recent and popular videos
    const recentVideos = videosWithVisibility
      .map((video) => {
        const collection = collections.find((c) => c.id === video.collectionId);
        return {
          ...video,
          imageFileUrl: video.imageFileId
            ? imageFileMap[video.imageFileId]
            : null,
          videoFileUrl: video.videoFileId
            ? videoFileMap[video.videoFileId]
            : null,
          collection: collection ? collection.name : null, // Add collection name
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt); // Sort by creation date, descending

    const popularVideos = videosWithVisibility
      .map((video) => {
        const collection = collections.find((c) => c.id === video.collectionId);
        return {
          ...video,
          imageFileUrl: video.imageFileId
            ? imageFileMap[video.imageFileId]
            : null,
          videoFileUrl: video.videoFileId
            ? videoFileMap[video.videoFileId]
            : null,
          collection: collection ? collection.name : null, // Add collection name
        };
      })
      .sort((a, b) => b.views - a.views); // Sort by views, descending

    // Grouping videos by collections
    const videosByCollection = collections
      .map((collection) => ({
        title: collection.name,
        videos: videosWithVisibility
          .filter((video) => video.collectionId === collection.id)
          .map((video) => ({
            ...video,
            imageFileUrl: video.imageFileId
              ? imageFileMap[video.imageFileId]
              : null,
            videoFileUrl: video.videoFileId
              ? videoFileMap[video.videoFileId]
              : null,
            collection: collection.name, // Add collection name
          })),
      }))
      .filter((c) => c.videos.length > 0); // Only include collections with videos

    // Constructing the final response
    const response = [
      {
        title: "Recent",
        videos: recentVideos,
      },
      {
        title: "Popular",
        videos: popularVideos,
      },
      ...videosByCollection,
    ];

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get videos detail viwe by video id
// export const getVideosDetailViewById = async (req, res) => {
//   const { videoId } = req.params;

//   try {
//     // Fetch the video details
//     const video = await prisma.videosDetailView.findUnique({
//       where: { id: Number(videoId) },
//     });

//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     // Fetch related video comments (posts)
//     const relatedComments = await prisma.post.findMany({
//       where: {
//         postType: "video",
//         targetId: Number(videoId),
//       },
//     });

//     // Fetch user details for all poster userIds
//     const userIds = [...new Set(relatedComments.map((post) => post.userId))]; // Get unique user IDs
//     const posterUsers = await prisma.user.findMany({
//       where: { id: { in: userIds } },
//       select: {
//         id: true,
//         firstName: true,
//         middleName: true,
//         lastName: true,
//         sex: true,
//         avatar: true,
//         college: true,
//         birthday: true,
//       },
//     });

//     // Map user details to their corresponding posts
//     const commentsWithUserInfo = relatedComments.map((post) => {
//       const user = posterUsers.find((u) => u.id === post.userId);
//       return {
//         ...post,
//         user: user || null, // Include user info if exists, otherwise null
//       };
//     });

//     return res.status(200).json({
//       video,
//       relatedComments: commentsWithUserInfo,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error fetching video or related comments",
//       error: error.message,
//     });
//   }
// };

export const getVideosDetailViewById = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Fetch the video details
    let video = await prisma.videosDetailView.findUnique({
      where: { id: Number(videoId) },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Fetching total likes count from user_video_likes table
    const totalLikes = await prisma.userVideoLikes.count({
      where: {
        videoId: Number(videoId),
      },
    });

    video.likes = totalLikes;

    // Fetch related video comments (posts)
    const relatedComments = await prisma.post.findMany({
      where: {
        postType: "video",
        targetId: Number(videoId),
      },
    });

    // Fetch user details for all poster userIds
    const userIds = [...new Set(relatedComments.map((post) => post.userId))]; // Get unique user IDs
    const posterUsers = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        sex: true,
        avatar: true,
        college: true,
        birthday: true,
      },
    });

    const decryptedPosterUsers = posterUsers.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          middleName: user.middleName ? decryptData(user.middleName) : null,
        };
      } catch (decryptError) {
        console.error(
          `Decryption failed for user ID ${user.id}:`,
          decryptError
        );
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
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

    // Fetch emotion reaction counts for each comment
    const emotionCounts = await prisma.userPostEmotion.groupBy({
      by: ["postId", "emotion"],
      _count: {
        emotion: true,
      },
      where: {
        postId: { in: relatedComments.map((comment) => comment.id) },
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

    // Map user details and emotion counts to their corresponding posts
    const commentsWithUserInfo = relatedComments.map((post) => {
      const user = decryptedPosterUsers.find((u) => u.id === post.userId);
      const emotions = emotionCountByPost[post.id] || emotionCountMapTemplate;
      return {
        ...post,
        user: user || null,
        // emotionCounts: emotionCountByPost[post.id] || {
        //   ...emotionCountMapTemplate,
        // }, // Get counts or default
        ...emotions,
      };
    });

    return res.status(200).json({
      video,
      relatedComments: commentsWithUserInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching video or related comments",
      error: error.message,
    });
  }
};

export const getVideoDetail = async (req, res) => {
  const videoId = parseInt(req.params.videoId); // Extract video ID from request parameters
  const user = req.user; // User from request (assumes user is fetched through authentication middleware)

  if (isNaN(videoId)) {
    return res.status(400).json({ error: "Invalid video ID" });
  }

  try {
    // Fetching the video data
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: {
        id: true,
        title: true,
        description: true,
        collectionId: true,
        imageFileId: true,
        videoFileId: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Fetching the associated collection data
    const collection = video.collectionId
      ? await prisma.collection.findUnique({
          where: { id: video.collectionId },
          select: {
            id: true,
            name: true,
            description: true,
          },
        })
      : null;

    // Fetching image and video file URLs for the video
    const imageFileUrl = video.imageFileId
      ? await prisma.file.findUnique({
          where: { id: video.imageFileId },
          select: { fileUrl: true },
        })
      : null;

    const videoFileUrl = video.videoFileId
      ? await prisma.file.findUnique({
          where: { id: video.videoFileId },
          select: { fileUrl: true },
        })
      : null;

    // Fetching comments related to the video (posts where targetId is the videoId)
    const comments = await prisma.post.findMany({
      where: {
        targetId: videoId, // Match posts where targetId is the video ID
        postType: "video", // Only include posts of type video
      },
      select: {
        id: true,
        userId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        targetId: true,
        pId: true,
        imageFileId: true, // Include the imageFileId to fetch image URL later
      },
    });

    // Fetching user data for each comment
    const userIds = comments
      .map((comment) => comment.userId)
      .filter((id) => id !== null);
    const users =
      userIds.length > 0
        ? await prisma.user.findMany({
            where: {
              id: { in: userIds },
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              sex: true,
              birthday: true,
              college: true,
              discussionAvatar: true,
            },
          })
        : [];

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
        };
      } catch (decryptError) {
        console.error(
          `Decryption failed for user ID ${user.id}:`,
          decryptError
        );
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
        };
      }
    });

    // Constructing a map for user data for quick lookup
    const userMap = decryptedUsers.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Adding user data, reply count, and image file URL to comments
    const commentsWithUserData = await Promise.all(
      comments.map(async (comment) => {
        // Counting the number of replies for each comment using pId
        const replyCount = await prisma.post.count({
          where: {
            pId: comment.id, // Count posts where pId matches the comment id
          },
        });

        // Fetching the image file URL for the comment if it exists
        const commentImageFileUrl = comment.imageFileId
          ? await prisma.file.findUnique({
              where: { id: comment.imageFileId },
              select: { fileUrl: true },
            })
          : null;

        // Fetching emotion counts for the comment
        const emotionCounts = await prisma.userPostEmotion.groupBy({
          by: ["emotion"],
          _count: {
            emotion: true,
          },
          where: {
            postId: comment.id,
          },
        });

        // Initializing the emotion count map with zeros
        const emotionCountMap = {
          heart: 0,
          cry: 0,
          laugh: 0,
          dislike: 0,
          surprise: 0,
          love: 0,
          pray: 0,
        };

        // Populate the counts from the fetched emotionCounts
        emotionCounts.forEach((item) => {
          const emotionKey = item.emotion; // This should match the keys in emotionCountMap
          if (emotionCountMap.hasOwnProperty(emotionKey)) {
            emotionCountMap[emotionKey] = item._count.emotion;
          }
        });

        return {
          ...comment,
          user: userMap[comment.userId] || null, // Include user information
          replyCount, // Include the count of replies
          isReply: true,
          imageFileUrl: commentImageFileUrl
            ? commentImageFileUrl.fileUrl
            : null, // Add image URL for the comment
          ...emotionCountMap, // Include emotion counts with this structured format
        };
      })
    );

    // Fetching total likes count from user_video_likes table
    const totalLikes = await prisma.userVideoLikes.count({
      where: {
        videoId: videoId,
      },
    });

    // Check if the current user has liked the video
    const isLiked = user
      ? await prisma.userVideoLikes.findUnique({
          where: {
            userId_videoId: {
              userId: user.id,
              videoId: videoId,
            },
          },
        })
      : null;

    // Constructing the final response
    const response = {
      video: {
        ...video,
        collection: collection, // Include collection data
        imageFileUrl: imageFileUrl ? imageFileUrl.fileUrl : null, // Include image file URL for the video
        videoFileUrl: videoFileUrl ? videoFileUrl.fileUrl : null, // Include video file URL
        likes: totalLikes, // Include total likes count for the video
        isLiked: !!isLiked, // Include the isLiked field
      },
      comments: commentsWithUserData, // Include comments with user data, reply count, image URL, and emotion counts
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single video by ID
export const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await prisma.video.findUnique({
      where: { id: Number(id) },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching video",
      error: error.message,
    });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    collectionName,
    description,
    tag1,
    tag2,
    tag3,
    imageFileId,
    videoFileId,
    status,
  } = req.body;

  try {
    // Check if the collection exists
    let collection = await prisma.collection.findUnique({
      where: {
        name: collectionName,
      },
    });

    // If the collection does not exist, create it
    if (!collection) {
      collection = await prisma.collection.create({
        data: {
          name: collectionName,
          // You can set other fields like collectionOrder, description, etc. if needed
        },
      });
    }

    let video = await prisma.video.findUnique({
      where: {
        id: Number(id),
      },
    });

    const updatedVideo = await prisma.video.update({
      where: { id: Number(id) },
      data: {
        title,
        collectionId: collection.id,
        description,
        tag1,
        tag2,
        tag3,
        imageFileId:
          Number(imageFileId) === -1 ? video.imageFileId : Number(imageFileId),
        videoFileId:
          Number(videoFileId) === -1 ? video.videoFileId : Number(videoFileId),
        status,
      },
    });

    return res.status(200).json(updatedVideo);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating video",
      error: error.message,
    });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.video.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting video",
      error: error.message,
    });
  }
};

// Toggle status for a specific video
export const toggleVideoStatus = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by ID
    const video = await prisma.video.findUnique({
      where: { id: Number(videoId) },
    });

    // Check if the video exists
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // Toggle the status
    const newStatus = video.status === "active" ? "inactive" : "active";

    // Update the video status
    const updatedVideo = await prisma.video.update({
      where: { id: Number(videoId) },
      data: { status: newStatus },
    });

    // Return the updated video
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementVideoViews = async (req, res) => {
  const videoId = parseInt(req.params.videoId); // Extract video ID from request parameters

  if (isNaN(videoId)) {
    return res.status(400).json({ error: "Invalid video ID" });
  }

  try {
    // Fetch the video to ensure it exists
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Increment the views count
    const updatedVideo = await prisma.video.update({
      where: { id: videoId },
      data: {
        views: video.views ? video.views + 1 : 1, // Increment views or set to 1 if null
      },
    });

    // Respond with the updated video data
    res.json({
      message: "Views updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const toggleUserVideoLike = async (req, res) => {
  const { userId, videoId } = req.body; // Expecting userId and videoId in the request body

  if (!userId || !videoId) {
    return res.status(400).json({ error: "User ID and Video ID are required" });
  }

  try {
    // Check if the like record already exists
    const existingLike = await prisma.userVideoLikes.findUnique({
      where: {
        userId_videoId: {
          userId: Number(userId),
          videoId: Number(videoId),
        },
      },
    });

    if (existingLike) {
      // If it exists, delete the like record
      await prisma.userVideoLikes.delete({
        where: {
          id: existingLike.id,
        },
      });
      // Get updated likes count after deletion
      const totalLikes = await prisma.userVideoLikes.count({
        where: {
          videoId: Number(videoId),
        },
      });
      return res.json({ message: "Like removed successfully", totalLikes });
    } else {
      // If it does not exist, create a new like record
      const newLike = await prisma.userVideoLikes.create({
        data: {
          userId: Number(userId),
          videoId: Number(videoId),
        },
      });
      // Get updated likes count after addition
      const totalLikes = await prisma.userVideoLikes.count({
        where: {
          videoId: Number(videoId),
        },
      });
      return res.json({ message: "Like added successfully", totalLikes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
