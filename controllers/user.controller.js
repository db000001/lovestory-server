import { PrismaClient } from "@prisma/client";
import stripe from "../config/stripe.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { json } from "express";
import { sendEmail } from "../utils/email.js";
import {
  chatEmailHTML,
  informationUpdateEmailHTML,
  userQuestionCompletedEmailHTML,
} from "../utils/emailTemplate.js";
import { decryptData, encryptData } from "../utils/encryption.js";

const prisma = new PrismaClient();

const refreshTokenCookieOptions = {
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const createUser = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    personalEmail,
    password,
    birthday,
    sex,
    avatar,
  } = req.body;

  try {
    // Extract domain from email
    const emailDomain = email.split("@")[1];

    // Check if the college exists with the given email domain
    const college = await prisma.college.findUnique({
      where: { emailDomain },
    });

    // If college does not exist, return an error
    if (!college) {
      return res
        .status(400)
        .json({ error: "Email domain not associated with any college." });
    }

    // Hash the password
    const hashedNewPassword = await bcrypt.hash(password, 10);

    // Create a new user with the college name
    const newUser = await prisma.user.create({
      data: {
        firstName: encryptData(firstName),
        middleName: encryptData(middleName),
        lastName: encryptData(lastName),
        email: encryptData(email),
        personalEmail: encryptData(personalEmail),
        password: hashedNewPassword,
        birthday,
        sex,
        avatar,
        college: college.college, // Set the college field to the college name
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        sex: { not: null },
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        personalEmail: true,
        birthday: true,
        sex: true,
        avatar: true,
        discussionAvatar: true,
        summary: true,
        college: true,
        status: true,
        password: false,
        role: true,
        joinedAt: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        verificationToken: false,
        verificationTokenExpiration: false,
        resetPwdToken: false,
        resetPwdTokenExpiration: false,
        refreshToken: false,
        postStatus: true,
        chatStatus: true,
        matchStatus: true,
        editStatus: true,
        depositStatus: true,
        withdrawStatus: true,
        logoutStatus: true,
        balance: true,
        premiumEndsAt: true,
        premiumName: true,
        paymentMethodId: true,
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
          personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
          personalEmail: "[DECRYPTION FAILED]",
        };
      }
    });

    res.status(200).json(decryptedUsers);
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get users by userIds
export const getSomeUsers = async (req, res) => {
  try {
    let { userIds } = req.query;

    console.log("userIds =>", userIds);
    if (!userIds) {
      return res.status(400).json({ error: "Missing userIds" });
    }

    if (!Array.isArray(userIds)) {
      userIds = [userIds];
    }

    // Convert to integers
    const ids = userIds
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    const users = await prisma.user.findMany({
      where: {
        id: { in: ids },
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
          personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
          personalEmail: "[DECRYPTION FAILED]",
        };
      }
    });

    res.status(200).json(decryptedUsers);
  } catch (error) {
    console.error("Error fetching users by IDs:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get blocked users
export const getBlockedUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { status: "inactive" },
    });

    const decryptedUsers = users.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          middleName: user.middleName ? decryptData(user.middleName) : null,
          email: user.email ? decryptData(user.email) : null,
          personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          middleName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
          personalEmail: "[DECRYPTION FAILED]",
        };
      }
    });

    const blockedUsers = decryptedUsers.map((user) => ({
      id: user.id,
      user: user.firstName + " " + user.lastName,
      email: user.email,
      college: user.college,
      updatedAt: user.updatedAt,
    }));
    res.status(200).json(blockedUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blocked users" });
  }
};

// Function to update user status to inactive
export const setUsersInactive = async (req, res) => {
  const { userEmails } = req.body; // Expecting an array of user emails

  // Validate input
  if (!Array.isArray(userEmails) || userEmails.length === 0) {
    return res
      .status(400)
      .json({ error: "Input must be a non-empty array of user Emails." });
  }

  // Update status for each user asynchronously
  const updatePromises = userEmails.map(async (email) => {
    // Validate each email
    if (typeof email !== "string" || email.trim() === "") {
      return { email, error: "Invalid email provided." };
    }

    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email: encryptData(email) },
      });

      if (!user) {
        return { email, error: "User not found." };
      }

      // Update user status to inactive
      const updatedUser = await prisma.user.update({
        where: { email: encryptData(email) },
        data: { status: "inactive" },
      });

      return { email: updatedUser.email, status: updatedUser.status };
    } catch (error) {
      return { email, error: error.message };
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

// Toggle status for a specific post
export const setUserActive = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user status
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { status: "active" },
    });

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get users view
export const getUsersView = async (req, res) => {
  try {
    // Fetch users for the specified college by college name
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "admin",
        },
        sex: {
          not: null,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        sex: true,
        createdAt: true,
        email: true,
        college: true,
        premiumName: true,
        premiumEndsAt: true,
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

    const results = await Promise.all(
      decryptedUsers.map(async (user) => {
        const fullName = `${user.firstName} ${user.lastName}`;

        // Last active date
        const lastActiveSession = await prisma.userSession.findFirst({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" }, // Get the most recent session
          select: { createdAt: true },
        });
        const lastActiveDate = lastActiveSession
          ? lastActiveSession.createdAt
          : null;

        // Matches count
        const matchesCount = await prisma.match.count({
          where: {
            OR: [{ email1: user.email }, { email2: user.email }],
          },
        });

        // Accepted matches count
        const acceptedCount = await prisma.match.count({
          where: {
            OR: [
              { email1: user.email, email1Status: "accepted" },
              { email2: user.email, email2Status: "accepted" },
            ],
          },
        });

        // Revenue calculation from transactions
        const transactions = await prisma.userTransactions.findMany({
          where: { userId: user.id },
        });

        const revenue = transactions.reduce((total, tx) => {
          if (
            tx.description?.includes("Subscription") ||
            tx.description?.includes("Information change")
          ) {
            return total + (tx.amount || 0);
          }
          if (tx.description?.includes("Information purchase")) {
            return total + (tx.amount / 2 || 0);
          }
          return total;
        }, 0);

        // Share calculation from information revenue
        const share = transactions.reduce((total, tx) => {
          if (tx.description?.includes("Information revenue share")) {
            return total + (tx.amount || 0);
          }
          return total;
        }, 0);

        return {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          college: user.college, // Retrieve name from college table
          premiumName: user.premiumName,
          premiumEndsAt: user.premiumEndsAt,
          sex: user.sex,
          joinedAt: user.createdAt,
          lastActive: lastActiveDate,
          matches: matchesCount,
          accepted: acceptedCount,
          revenue,
          share,
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get users statistics view
export const getUserStatisticsView = async (req, res) => {
  try {
    const userStatistics = await prisma.userStatisticsView.findMany();
    res.status(200).json(userStatistics[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        personalEmail: true,
        birthday: true,
        sex: true,
        avatar: true,
        discussionAvatar: true,
        summary: true,
        college: true,
        balance: true,
        status: true,
        joinedAt: true,
        postStatus: true,
        chatStatus: true,
        matchStatus: true,
        editStatus: true,
        depositStatus: true,
        withdrawStatus: true,
        logoutStatus: true,
        paymentMethodId: true,
        premiumName: true,
        premiumEndsAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const decryptedUser = {
      ...user,
      firstName: user.firstName ? decryptData(user.firstName) : null,
      lastName: user.lastName ? decryptData(user.lastName) : null,
      middleName: user.middleName ? decryptData(user.middleName) : null,
      email: user.email ? decryptData(user.email) : null,
      personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
    };

    if (!decryptedUser.paymentMethodId) {
      return res.status(200).json({
        ...decryptedUser,
        cardBrand: null,
        cardLast4Number: null,
      });
    }

    // Retrieve the payment method from Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(
      decryptedUser.paymentMethodId
    );

    // Check if payment method exists and is a Mastercard
    if (!paymentMethod) {
      await prisma.user.update({
        where: { id: decryptedUser.id },
        data: {
          paymentMethodId: null,
        },
      });
      return res.status(200).json({
        ...decryptedUser,
        cardBrand: null,
        cardLast4Number: null,
      });
    }

    res.status(200).json({
      ...decryptedUser,
      cardBrand: paymentMethod ? paymentMethod.card.brand : null,
      cardLast4Number: paymentMethod ? paymentMethod.card.last4 : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by Email
export const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: encryptData(email) }, { personalEmail: encryptData(email) }],
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        personalEmail: true,
        birthday: true,
        sex: true,
        avatar: true,
        discussionAvatar: true,
        summary: true,
        college: true,
        balance: true,
        status: true,
        joinedAt: true,
        postStatus: true,
        chatStatus: true,
        matchStatus: true,
        editStatus: true,
        depositStatus: true,
        withdrawStatus: true,
        logoutStatus: true,
        paymentMethodId: true,
        premiumName: true,
        premiumEndsAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const decryptedUser = {
      ...user,
      firstName: user.firstName ? decryptData(user.firstName) : null,
      lastName: user.lastName ? decryptData(user.lastName) : null,
      middleName: user.middleName ? decryptData(user.middleName) : null,
      email: user.email ? decryptData(user.email) : null,
      personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
    };

    if (!decryptedUser.paymentMethodId) {
      return res.status(200).json({
        ...decryptedUser,
        cardBrand: null,
        cardLast4Number: null,
      });
    }

    // Retrieve the payment method from Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(
      decryptedUser.paymentMethodId
    );

    // Check if payment method exists and is a Mastercard
    if (!paymentMethod) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          paymentMethodId: null,
        },
      });
      return res.status(200).json({
        ...decryptedUser,
        cardBrand: null,
        cardLast4Number: null,
      });
    }

    res.status(200).json({
      ...decryptedUser,
      cardBrand: paymentMethod ? paymentMethod.card.brand : null,
      cardLast4Number: paymentMethod ? paymentMethod.card.last4 : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatchedUserById = async (req, res) => {
  const { matchedUserId } = req.params;
  const user = req.user;

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    // Fetch the matched user details
    const user = await prisma.user.findUnique({
      where: { id: Number(matchedUserId) },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        birthday: true,
        sex: true,
        avatar: true,
        discussionAvatar: true,
        summary: true,
        college: true,
        status: true,
        joinedAt: true,
        postStatus: true,
        chatStatus: true,
        matchStatus: true,
        editStatus: true,
        depositStatus: true,
        withdrawStatus: true,
        logoutStatus: true,
        premiumEndsAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const decryptedUser = {
      ...user,
      firstName: user.firstName ? decryptData(user.firstName) : null,
      lastName: user.lastName ? decryptData(user.lastName) : null,
      middleName: user.middleName ? decryptData(user.middleName) : null,
      email: user.email ? decryptData(user.email) : null,
      personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
    };

    // Fetch the match data
    const match = await prisma.match.findFirst({
      where: {
        OR: [
          { email1: decryptedUser.email, email2: req.user.email },
          { email1: req.user.email, email2: decryptedUser.email },
        ],
      },
      select: {
        id: true,
        email1: true,
        email1Status: true,
        email2: true,
        email2Status: true,
        score: true,
        createdAt: true,
        updatedAt: true,
        expiration: true,
      },
    });

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    const miscellaneous = await prisma.miscellaneous.findUnique({
      where: {
        id: 1,
      },
    });
    const today = new Date();
    let matchExpiration = match.createdAt;

    if (
      currentUser.premiumEndsAt !== null &&
      currentUser.premiumEndsAt > today
    ) {
      matchExpiration.setDate(
        matchExpiration.getDate() +
          Number(miscellaneous.subscriberMatchDeadline)
      );
      // Combine user data with match data
      return res.status(200).json({
        user: decryptedUser,
        match: {
          ...match,
          expTimeLeft: matchExpiration - new Date(),
        },
      });
    }
    matchExpiration.setDate(
      matchExpiration.getDate() + Number(miscellaneous.regularMatchDeadline)
    );
    // Combine user data with match data
    return res.status(200).json({
      user: decryptedUser,
      match: {
        ...match,
        expTimeLeft: matchExpiration - new Date(),
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the URL
  const {
    firstName,
    lastName,
    email,
    personalEmail,
    birthday,
    avatar,
    discussionAvatar,
    oldPassword,
    newPassword,
  } = req.body;

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if old password is provided and matches the current password
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Hash the new password before saving
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword; // Update password
    }

    // Update other fields
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        firstName: encryptData(firstName),
        lastName: encryptData(lastName),
        email: encryptData(email),
        personalEmail: encryptData(personalEmail),
        birthday,
        avatar,
        discussionAvatar,
        password: user.password, // Ensure the new password is included if updated
      },
    });

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;

    // Fetch the user from the database
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Validate new password (you can add your own validation logic)
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { statusField, statusValue, action } = req.body;

  try {
    // Validate input
    if (!userId || !statusField || statusValue === undefined || !action) {
      return res.status(400).json({
        error:
          "Invalid input. Please provide a valid userId, statusField, statusValue, and action.",
      });
    }

    // Supported status fields for validation
    const validStatusFields = [
      "postStatus",
      "chatStatus",
      "matchStatus",
      "editStatus",
      "depositStatus",
      "withdrawStatus",
      "logoutStatus",
    ];

    if (!validStatusFields.includes(statusField)) {
      throw new Error(
        "Invalid status field. Please provide a valid status field."
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the update data
    const updateData = {};
    updateData[statusField] = statusValue;

    // Update the user status field
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: updateData,
    });

    // Log the action in the UserStatusAction table
    await prisma.userStatusAction.create({
      data: {
        userId: Number(userId),
        statusAction: action,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User status updated successfully.",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserStatusActions = async (req, res) => {
  const userId = parseInt(req.params.userId); // Extract user ID from URL

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch the status action history for the given user ID
    const userStatusActions = await prisma.userStatusAction.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }, // Order by most recent actions
    });

    if (userStatusActions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No status actions found for the given user.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "User status actions retrieved successfully.",
      data: userStatusActions,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateSummary = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const { summary } = req.body; // Extract the new summary from the request body

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (typeof summary !== "string" || summary.trim() === "") {
      return res
        .status(400)
        .json({ message: "Summary must be a non-empty string." });
    }

    // Validate if the user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId, 10), // Ensure userId is an integer
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the summary for the given userId
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId, 10),
      },
      data: {
        summary: summary.trim(), // Trim whitespace from the summary
      },
    });

    // Respond with the updated user data
    return res.status(200).json({
      message: "Summary updated successfully.",
      user: {
        userId: updatedUser.id,
        summary: updatedUser.summary,
      },
    });
  } catch (error) {
    console.error("Error updating summary:", error);

    // Handle other errors
    return res
      .status(500)
      .json({ message: "An error occurred while updating the summary." });
  }
};

// Create a new UserFilter
export const createOrUpdateUserFilter = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      middleName,
      lastName,
      age,
      sex,
      eyeColor,
      currentHairColor,
      naturalHairColor,
      height,
      weight,
      bodyType,
      religiousAffiliation,
      ethnicity,
      ethnicSubgroup,
      currentCollege,
      currentState,
      homeState,
      politicalViews,
      typeOfRelationship,
      numberOfChildren,
    } = req.body; // Destructure userId and other fields from the request body

    // Validate that userId is provided and is a valid number
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({
        message: "Invalid or missing userId. It must be a valid number.",
      });
    }

    // Try to upsert the UserFilter record
    const userFilter = await prisma.userFilters.upsert({
      where: { userId: Number(userId) }, // Ensure userId uniqueness
      update: {
        firstName: encryptData(firstName),
        middleName: encryptData(middleName),
        lastName: encryptData(lastName),
        age: encryptData(age),
        sex: encryptData(sex),
        eyeColor: encryptData(eyeColor),
        currentHairColor: encryptData(currentHairColor),
        naturalHairColor: encryptData(naturalHairColor),
        height: encryptData(height),
        weight: encryptData(weight),
        bodyType: encryptData(bodyType),
        religiousAffiliation: encryptData(religiousAffiliation),
        ethnicity: encryptData(ethnicity),
        ethnicSubgroup: encryptData(ethnicSubgroup),
        currentCollege: encryptData(currentCollege),
        currentState: encryptData(currentState),
        homeState: encryptData(homeState),
        politicalViews: encryptData(politicalViews),
        typeOfRelationship: encryptData(typeOfRelationship),
        numberOfChildren: encryptData(numberOfChildren),
      },
      create: {
        userId: Number(userId), // If it doesn't exist, create a new record
        firstName: encryptData(firstName),
        middleName: encryptData(middleName),
        lastName: encryptData(lastName),
        age: encryptData(age),
        sex: encryptData(sex),
        eyeColor: encryptData(eyeColor),
        currentHairColor: encryptData(currentHairColor),
        naturalHairColor: encryptData(naturalHairColor),
        height: encryptData(height),
        weight: encryptData(weight),
        bodyType: encryptData(bodyType),
        religiousAffiliation: encryptData(religiousAffiliation),
        ethnicity: encryptData(ethnicity),
        ethnicSubgroup: encryptData(ethnicSubgroup),
        currentCollege: encryptData(currentCollege),
        currentState: encryptData(currentState),
        homeState: encryptData(homeState),
        politicalViews: encryptData(politicalViews),
        typeOfRelationship: encryptData(typeOfRelationship),
        numberOfChildren: encryptData(numberOfChildren),
      },
    });

    return res.status(201).json({
      message: "User filter created or updated successfully.",
      userFilter,
    });
  } catch (error) {
    console.error("Error creating or updating user filter:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// Get all UserFilters
export const getAllUserFilters = async (req, res) => {
  try {
    // Retrieve all UserFilter records
    const userFilters = await prisma.userFilters.findMany();

    return res.status(200).json({
      message: "User filters retrieved successfully.",
      userFilters,
    });
  } catch (error) {
    console.error("Error retrieving user filters:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Get a single UserFilter by ID
export const getUserFilterById = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the ID from the request parameters

    // Find the UserFilter by ID
    const userFilter = await prisma.userFilters.findUnique({
      where: {
        userId: parseInt(userId, 10), // Ensure ID is an integer
      },
    });

    if (!userFilter) {
      return res.status(200).json({
        message: "User filter not found.",
        userFilter: null
      });
    }

    const decryptedUserFilter = {
      id: userFilter.id,
      userId: userFilter.userId,
      firstName: decryptData(userFilter.firstName),
      middleName: decryptData(userFilter.middleName),
      lastName: decryptData(userFilter.lastName),
      age: decryptData(userFilter.age),
      sex: decryptData(userFilter.sex),
      eyeColor: decryptData(userFilter.eyeColor),
      currentHairColor: decryptData(userFilter.currentHairColor),
      naturalHairColor: decryptData(userFilter.naturalHairColor),
      height: decryptData(userFilter.height),
      weight: decryptData(userFilter.weight),
      bodyType: decryptData(userFilter.bodyType),
      religiousAffiliation: decryptData(userFilter.religiousAffiliation),
      ethnicity: decryptData(userFilter.ethnicity),
      ethnicSubgroup: decryptData(userFilter.ethnicSubgroup),
      currentCollege: decryptData(userFilter.currentCollege),
      currentState: decryptData(userFilter.currentState),
      homeState: decryptData(userFilter.homeState),
      politicalViews: decryptData(userFilter.politicalViews),
      typeOfRelationship: decryptData(userFilter.typeOfRelationship),
      numberOfChildren: decryptData(userFilter.numberOfChildren),
    };

    return res.status(200).json({
      message: "User filter retrieved successfully.",
      userFilter: decryptedUserFilter,
    });
  } catch (error) {
    console.error("Error retrieving user filter:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const toggleUserPostEmotion = async (req, res) => {
  const { userId, postId, emotion } = req.body; // Expecting userId, postId, and emotion in the request body

  if (!userId || !postId || !emotion) {
    return res
      .status(400)
      .json({ error: "User ID, Post ID, and Emotion are required" });
  }

  try {
    // Check if the emotion record already exists
    const existingEmotion = await prisma.userPostEmotion.findUnique({
      where: {
        userId_postId: {
          userId: Number(userId),
          postId: Number(postId),
        },
      },
    });

    if (existingEmotion) {
      // If an existing emotion is found
      const updatedEmotion = await prisma.userPostEmotion.update({
        where: {
          id: existingEmotion.id,
        },
        data: {
          emotion: emotion, // Update with new emotion
        },
      });
      return res.json({
        message: "Emotion updated successfully",
        emotion: updatedEmotion,
      });
    } else {
      // If it does not exist, create a new emotion record
      const newEmotion = await prisma.userPostEmotion.create({
        data: {
          userId: Number(userId),
          postId: Number(postId),
          emotion: emotion, // Set the emotion type (like, love, etc.)
        },
      });
      return res.json({
        message: "Emotion added successfully",
        emotion: newEmotion,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a UserFilter by ID
export const updateUserFilter = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the ID from the request parameters
    const data = req.body; // Extract the updated data from the request body

    // Update the UserFilter record
    const updatedUserFilter = await prisma.userFilters.update({
      where: {
        userId: parseInt(userId, 10), // Ensure ID is an integer
      },
      data,
    });

    return res.status(200).json({
      message: "User filter updated successfully.",
      userFilter: updatedUserFilter,
    });
  } catch (error) {
    console.error("Error updating user filter:", error);

    // Handle case where the record does not exist
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "User filter not found.",
      });
    }

    return res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a UserFilter by ID
export const deleteUserFilter = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Delete the UserFilter record
    await prisma.userFilters.delete({
      where: {
        id: parseInt(id, 10), // Ensure ID is an integer
      },
    });

    return res.status(200).json({
      message: "User filter deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user filter:", error);

    // Handle case where the record does not exist
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "User filter not found.",
      });
    }

    return res.status(500).json({
      message: "An error occurred while deleting the user filter.",
    });
  }
};

// Create or update UserQA record if the same userId already exists
export const createUserQA = async (req, res) => {
  try {
    const { qa, userId, session, timezone, ipv4, ipv6 } = req.body;

    if (!Array.isArray(qa) || qa.length === 0) {
      return res.status(400).json({ error: "Input must be a non-empty array" });
    }

    // Fetch the user from the User table
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    // If user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Prepare to collect updated user data
    const updatedData = {};

    // Process each QA entry
    qa.forEach((data) => {
      // Check indices and set the answer based on the user information
      if (data.qIndex === 0 && data.sIndex === 0) {
        if (data.pIndex === 0) {
          updatedData.firstName = encryptData(data.answer); // Use user's firstName
        } else if (data.pIndex === 1) {
          updatedData.lastName = encryptData(data.answer); // Use user's lastName
        } else if (data.pIndex === 2) {
          updatedData.middleName = encryptData(data.answer); // Use user's middleName
        }
      } else if (data.qIndex === 0 && data.sIndex === 1 && data.pIndex === 0) {
        updatedData.birthday = data.answer; // Use user's birthday
      } else if (data.qIndex === 0 && data.sIndex === 2 && data.pIndex === 0) {
        updatedData.sex = data.answer.toLowerCase(); // Use user's sex
      }
    });

    // Update the user with the new data if there are any updates
    if (Object.keys(updatedData).length > 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: updatedData,
      });
    }

    // Delete existing records for the same userId
    await prisma.userQA.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    // Prepare an array to hold the new UserQA records
    const userQAsToCreate = qa.map((data) => ({
      userId: Number(userId),
      answer: encryptData(data.answer), // Default to provided answer
      qIndex: data.qIndex,
      sIndex: data.sIndex,
      pIndex: data.pIndex,
      gIndex: data.gIndex,
      toggle: data.toggle ?? true,
    }));

    // Create new UserQA records in bulk
    const createdUserQAs = await prisma.userQA.createMany({
      data: userQAsToCreate,
    });

    await sendEmail({
      email: "noreply@lovestory.ai",
      subject: `${decryptData(user.email)} ${decryptData(updatedData.firstName)} ${decryptData(updatedData.middleName)} ${decryptData(updatedData.lastName)} Registration`,
      html: userQuestionCompletedEmailHTML(
        qa,
        decryptData(user.email),
        decryptData(updatedData.firstName),
        decryptData(updatedData.middleName),
        decryptData(updatedData.lastName)
      ),
    });

    // Create payload for JWT tokens
    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Generate access and refresh tokens
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    // Update the user's refresh token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken },
    });

    // Store session data in the UserSession table
    await prisma.userSession.create({
      data: {
        userId: user.id,
        session: session || "Unknown Device", // Store provided device name or a default value
        timezone: timezone || "Unknown Timezone", // Use provided timezone or a default value
        ipv4: ipv4 || null, // Use provided IPv4 or null if not provided
        ipv6: ipv6 || null, // Use provided IPv6 or null if not provided
      },
    });

    // Set the refresh token as a cookie
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // Respond with the access token and user details
    return res.status(200).json({
      message: "Created User QA and Login success.",
      accessToken,
      createdUserQAs,
      user: {
        userId: user.id,
        email: decryptData(user.email),
        fullName:
          decryptData(user.firstName) + " " + decryptData(user.lastName),
        emailVerified: user.emailVerified,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in createUserQA:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateUserQA = async (req, res) => {
  try {
    const { qa, userId, shopItems } = req.body;

    if (!Array.isArray(qa) || qa.length === 0) {
      return res.status(400).json({ error: "Input must be a non-empty array" });
    }

    // Fetch the user from the User table
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    // If user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Prepare to collect updated user data
    const updatedData = {};

    // Process each QA entry
    qa.forEach((data) => {
      // Check indices and set the answer based on the user information
      if (data.qIndex === 0 && data.sIndex === 0) {
        if (data.pIndex === 0) {
          updatedData.firstName = encryptData(data.answer); // Use user's firstName
        } else if (data.pIndex === 1) {
          updatedData.lastName = encryptData(data.answer); // Use user's lastName
        } else if (data.pIndex === 2) {
          updatedData.middleName = encryptData(data.answer); // Use user's middleName
        }
      } else if (data.qIndex === 0 && data.sIndex === 1 && data.pIndex === 0) {
        updatedData.birthday = new Date(data.answer); // Use user's birthday
      } else if (data.qIndex === 0 && data.sIndex === 2 && data.pIndex === 0) {
        updatedData.sex = data.answer.toLowerCase(); // Use user's sex
      }
    });

    // Update the user with the new data if there are any updates
    if (Object.keys(updatedData).length > 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: updatedData,
      });
    }

    // Delete existing records for the same userId
    await prisma.userQA.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    // Prepare an array to hold the new UserQA records
    const userQAsToCreate = qa.map((data) => ({
      userId: Number(userId),
      answer: encryptData(data.answer), // Default to provided answer
      qIndex: data.qIndex,
      sIndex: data.sIndex,
      pIndex: data.pIndex,
      gIndex: data.gIndex,
      toggle: data.toggle ?? true,
    }));

    // Create new UserQA records in bulk
    await prisma.userQA.createMany({
      data: userQAsToCreate,
    });

    if (shopItems.length > 0) {
      await sendEmail({
        email: decryptData(user.personalEmail)
          ? decryptData(user.personalEmail)
          : decryptData(user.email),
        subject: `Information Change Purchase`,
        html: informationUpdateEmailHTML(qa, shopItems),
      });
    }

    // Respond with the access token and user details
    return res.status(200).json({
      message: "Updated User QA.",
    });
  } catch (error) {
    console.error("Error in createUserQA:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all UserQA records
export const getAllUserQA = async (req, res) => {
  try {
    const userQAs = await prisma.userQA.findMany();
    res.status(200).json(userQAs);
  } catch (error) {
    console.error("Error fetching UserQAs:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single UserQA record by userID
export const getUserQAByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userQA = await prisma.userQA.findMany({
      where: { userId },
    });
    const decryptedUserQA = userQA.map((qa) => {
      try {
        return {
          ...qa,
          answer: qa.answer ? decryptData(qa.answer) : null, // Only decrypt if answer exists
        };
      } catch (decryptError) {
        console.error(`Decryption failed for QA ID ${qa.id}:`, decryptError);
        return {
          ...qa,
          answer: "[DECRYPTION FAILED]", // Handle decryption errors gracefully
        };
      }
    });
    res.status(200).json(decryptedUserQA);
  } catch (error) {
    console.error("Error fetching UserQA by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update the toggle field of a UserQA record by userID
export const updateUserQAToggleByUserId = async (req, res) => {
  const { qIndex, sIndex, pIndex, toggle } = req.body;
  try {
    const userId = parseInt(req.params.userId);

    console.log(userId, qIndex, sIndex, pIndex, toggle);

    const updated = await prisma.userQA.updateMany({
      where: {
        userId: userId,
        qIndex: Number(qIndex),
        sIndex: Number(sIndex),
        pIndex: Number(pIndex),
      },
      data: {
        toggle: toggle,
      },
    });

    res.status(200).json({
      message: `${updated.count} record(s) updated.`,
      success: true,
    });
  } catch (error) {
    console.error("Error updating UserQA toggle:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a UserQA record by userID
export const deleteUserQA = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const deletedUserQA = await prisma.userQA.delete({
      where: { userId },
    });

    res.status(200).json(deletedUserQA);
  } catch (error) {
    console.error("Error deleting UserQA:", error);
    res.status(400).json({ error: error.message });
  }
};

// Create a new UserFavoriteCategory
export const createUserFavoCategory = async (req, res) => {
  const { userId, categoryId } = req.body;
  try {
    const newCategory = await prisma.userFavoCategory.create({
      data: {
        userId: Number(userId),
        categoryId: Number(categoryId),
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a UserFavoriteCategory by ID
export const deleteUserFavoCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    console.log(categoryId, req.user.id);
    await prisma.userFavoCategory.deleteMany({
      where: { userId: Number(req.user.id), categoryId: Number(categoryId) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all UserFavoriteCategories by userId
export const getUserFavoCategoriesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const categories = await prisma.userFavoCategory.findMany({
      where: { userId: Number(userId) },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUserNotification = async (req, res) => {
  try {
    const { userId, chatNotificationStatus, discussionNotificationStatus } =
      req.body;

    const upsertedNotification = await prisma.userNotification.upsert({
      where: {
        userId: Number(userId),
      },
      update: {
        chatNotificationStatus,
        discussionNotificationStatus,
      },
      create: {
        userId: Number(userId),
        chatNotificationStatus,
        discussionNotificationStatus,
      },
    });

    res.status(200).json(upsertedNotification);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Failed to upsert notification", details: error.message });
  }
};

export const getAllUserNotifications = async (req, res) => {
  try {
    const notifications = await prisma.userNotification.findMany();
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch notifications", details: error.message });
  }
};

export const getUserNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.userNotification.findUnique({
      where: { id: parseInt(id) },
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch notification", details: error.message });
  }
};

export const getUserNotificationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const notification = await prisma.userNotification.findFirst({
      where: { userId: parseInt(userId) },
    });

    if (!notification) {
      return res.status(200).json({ chatNotificationStatus: true });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notification by userId",
      details: error.message,
    });
  }
};

export const updateUserNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, chatNotificationStatus, discussionNotificationStatus } =
      req.body;

    const updated = await prisma.userNotification.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        chatNotificationStatus,
        discussionNotificationStatus,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update notification", details: error.message });
  }
};

export const updateUserNotificationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { chatNotificationStatus, discussionNotificationStatus } = req.body;

    // Find the existing record first
    const existing = await prisma.userNotification.findFirst({
      where: { userId: parseInt(userId) },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ error: "Notification not found for this user" });
    }

    // Update the found record by ID
    const updated = await prisma.userNotification.update({
      where: { id: existing.id },
      data: {
        chatNotificationStatus,
        discussionNotificationStatus,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update by userId", details: error.message });
  }
};

export const deleteUserNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.userNotification.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete notification", details: error.message });
  }
};

export const deleteUserNotificationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the existing notification
    const existing = await prisma.userNotification.findFirst({
      where: { userId: parseInt(userId) },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ error: "Notification not found for this user" });
    }

    // Delete by ID
    await prisma.userNotification.delete({
      where: { id: existing.id },
    });

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete by userId", details: error.message });
  }
};

export const createUserChatNotification = async (req, res) => {
  try {
    const { userId, chatId, status } = req.body;

    const upserted = await prisma.userChatNotification.upsert({
      where: {
        userId_chatId: {
          userId: Number(userId),
          chatId: Number(chatId),
        },
      },
      update: {
        status,
      },
      create: {
        userId: Number(userId),
        chatId: Number(chatId),
        status,
      },
    });

    res.status(200).json(upserted);
  } catch (error) {
    res.status(500).json({
      error: "Failed to upsert chat notification",
      details: error.message,
    });
  }
};

export const sendUserChatNotificationEmail = async (req, res) => {
  try {
    const { senderId, receiverId, messages } = req.body;

    const sender = await prisma.user.findUnique({
      where: { id: parseInt(senderId) },
    });

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const receiver = await prisma.user.findUnique({
      where: { id: parseInt(receiverId) },
    });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const receiverChatNotificationStatus =
      await prisma.userNotification.findFirst({
        where: { userId: parseInt(receiverId) },
      });

    if (
      receiverChatNotificationStatus &&
      !receiverChatNotificationStatus.chatNotificationStatus
    ) {
      return res.status(200).json({ message: "Receiver notification off." });
    }

    const senderChatNotificationStatus =
      await prisma.userChatNotification.findFirst({
        where: { userId: parseInt(receiverId), chatId: Number(senderId) },
      });

    if (senderChatNotificationStatus && !senderChatNotificationStatus.status) {
      return res.status(200).json({ message: "Receiver notification off." });
    }

    await sendEmail({
      email: receiver.personalEmail ? decryptData(receiver.personalEmail) : decryptData(receiver.email),
      subject: `New Message from ${decryptData(sender.firstName)}`,
      html: chatEmailHTML(`${decryptData(sender.firstName)}`, sender.avatar, messages),
    });

    res.status(200).json({ message: "Sent email successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Failed to send chat email.",
      details: error.message,
    });
  }
};

export const getAllUserChatNotifications = async (req, res) => {
  try {
    const notifications = await prisma.userChatNotification.findMany();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch chat notifications",
      details: error.message,
    });
  }
};

export const getUserChatNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.userChatNotification.findUnique({
      where: { id: Number(id) },
    });

    if (!notification) {
      return res.status(404).json({ error: "Chat notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch chat notification",
      details: error.message,
    });
  }
};

export const getUserChatNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { chatId } = req.query;

    const notification = await prisma.userChatNotification.findFirst({
      where: { userId: Number(userId), chatId: Number(chatId) },
    });

    if (!notification) {
      return res.status(200).json({ status: true });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notifications by userId",
      details: error.message,
    });
  }
};

export const updateUserChatNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, chatId, status } = req.body;

    const updated = await prisma.userChatNotification.update({
      where: { id: Number(id) },
      data: {
        userId: userId !== undefined ? Number(userId) : undefined,
        chatId: chatId !== undefined ? Number(chatId) : undefined,
        status,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update chat notification",
      details: error.message,
    });
  }
};

export const updateUserChatNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { chatId, status } = req.body;

    const updated = await prisma.userChatNotification.updateMany({
      where: { userId: Number(userId) },
      data: {
        chatId: chatId !== undefined ? Number(chatId) : undefined,
        status,
      },
    });

    res.status(200).json({ count: updated.count });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update notifications by userId",
      details: error.message,
    });
  }
};

export const deleteUserChatNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.userChatNotification.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete chat notification",
      details: error.message,
    });
  }
};

export const deleteUserChatNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await prisma.userChatNotification.deleteMany({
      where: { userId: Number(userId) },
    });

    res.status(200).json({ count: deleted.count });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete notifications by userId",
      details: error.message,
    });
  }
};
