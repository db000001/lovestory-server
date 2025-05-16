import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../utils/email.js";
import {
  addMatchesEmailHTML,
  approvedMatchEmailHTML,
  declinedMatchEmailHTML,
  reigniteMatchEmailHTML,
} from "../utils/emailTemplate.js";
import cron from "node-cron";
import { decryptData, encryptData } from "../utils/encryption.js";

const prisma = new PrismaClient();

export const createMatches = async (req, res) => {
  const matches = req.body; // Expecting an array of matches

  try {
    // Validate that the input is an array
    if (!Array.isArray(matches)) {
      return res
        .status(400)
        .json({ error: "Input must be an array of matches." });
    }

    // Prepare an array to hold promises for match creation and updates
    const matchPromises = matches.map(async (match) => {
      const { email1, email2 } = match;

      // Check if a match already exists with the same email1 and email2
      const existingMatch = await prisma.match.findFirst({
        where: {
          OR: [
            { email1: email1, email2: email2 },
            { email1: email2, email2: email1 },
          ],
        },
      });

      const existingUser1 = await prisma.user.findUnique({
        where: {
          email: encryptData(email1),
        },
      });

      const decryptedExistingUser1 = {
        ...existingUser1,
        firstName: existingUser1.firstName ? decryptData(existingUser1.firstName) : null,
        lastName: existingUser1.lastName ? decryptData(existingUser1.lastName) : null,
        middleName: existingUser1.middleName ? decryptData(existingUser1.middleName) : null,
        email: existingUser1.email ? decryptData(existingUser1.email) : null,
      };

      const existingUser2 = await prisma.user.findUnique({
        where: {
          email: encryptData(email2),
        },
      });

      const decryptedExistingUser2 = {
        ...existingUser2,
        firstName: existingUser2.firstName ? decryptData(existingUser2.firstName) : null,
        lastName: existingUser2.lastName ? decryptData(existingUser2.lastName) : null,
        middleName: existingUser2.middleName ? decryptData(existingUser2.middleName) : null,
        email: existingUser2.email ? decryptData(existingUser2.email) : null,
      };

      // If a duplicate match is found, update it
      if (existingMatch) {
        // return prisma.match.update({
        //   where: { id: existingMatch.id }, // Use the ID of the existing match
        //   data: {
        //     email1: match.email1,
        //     email1Status: match.email1Status,
        //     email2: match.email2,
        //     email2Status: match.email2Status,
        //     score: Number(match.score),
        //   }, // Update with new data
        // });
        return null;
      }

      const today = new Date();
      const birthday1 = new Date(decryptedExistingUser1.birthday);
      const birthday2 = new Date(decryptedExistingUser2.birthday);

      await sendEmail({
        email: decryptedExistingUser1.personalEmail
          ? decryptedExistingUser1.personalEmail
          : decryptedExistingUser1.email,
        subject: `Matched`,
        html: addMatchesEmailHTML(
          `${decryptedExistingUser2.firstName}`,
          decryptedExistingUser2.avatar,
          today.getFullYear() - birthday2.getFullYear(),
          match.score,
          decryptedExistingUser2.summary
        ),
      });

      await sendEmail({
        email: decryptedExistingUser2.personalEmail
          ? decryptedExistingUser2.personalEmail
          : decryptedExistingUser2.email,
        subject: `Matched`,
        html: addMatchesEmailHTML(
          `${decryptedExistingUser1.firstName}`,
          decryptedExistingUser1.avatar,
          today.getFullYear() - birthday1.getFullYear(),
          match.score,
          decryptedExistingUser1.summary
        ),
      });

      const expirationEndDate = new Date();
      expirationEndDate.setMonth(expirationEndDate.getMonth() + 2);

      // If no existing match is found, create a new match
      return prisma.match.create({
        data: {
          email1: match.email1,
          email1Status: match.email1Status,
          email2: match.email2,
          email2Status: match.email2Status,
          score: Number(match.score),
          expiration: expirationEndDate,
        },
      });
    });

    // Wait for all promises to resolve
    const results = await Promise.all(matchPromises);

    // Return the created or updated matches
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await prisma.match.findMany();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get matches view
export const getMatchesView = async (req, res) => {
  try {
    const matches = await prisma.match.findMany();
    
    if (!matches) {
      return res.status(404).json({ error: "Matches not found" });
    }

    const matchesView = await Promise.all(
      matches.map(async (match) => {
        const user1 = await prisma.user.findUnique({
          where: {
            email: encryptData(match.email1),
          },
        });

        const user2 = await prisma.user.findUnique({
          where: {
            email: encryptData(match.email2),
          },
        });

        // Return a new object with the likes property added
        return {
          ...match,
          user1Id: user1.id,
          user1Name: decryptData(user1.firstName) + ' ' + decryptData(user1.lastName),
          user1Status: match.email1Status,
          user2Id: user2.id,
          user2Name: decryptData(user2.firstName) + ' ' + decryptData(user2.lastName),
          user2Status: match.email2Status
        };
      })
    );

    res.json(matchesView);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a match by ID
export const getMatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const match = await prisma.match.findUnique({
      where: { id: Number(id) },
    });
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatchedUsersByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter

  try {
    // Fetch the user by userId to get their email
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, email: true }, // Only fetch the email field
    });

    // If user doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const decryptedUser = {
      ...user,
      email: user.email ? decryptData(user.email) : null,
    };

    // Get the current date for expiration check
    const currentDate = new Date();

    // Find matches associated with the user's email
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ email1: decryptedUser.email }, { email2: decryptedUser.email }],
      },
    });

    // Map matches to get matched users and their statuses
    const matchedUsersData = matches.map((match) => {
      const isExpired = match.expiration < currentDate; // Determine if the match is expired
      return {
        email: match.email1 === decryptedUser.email ? match.email2 : match.email1,
        email1: match.email1,
        email2: match.email2,
        score: match.score,
        status:
          match.email1 === decryptedUser.email ? match.email1Status : match.email2Status,
        email1Status: match.email1Status,
        email2Status: match.email2Status,
        createdAt: match.createdAt,
        isExpired, // Add the isExpired field to the result
      };
    });

    // Fetch users based on matched emails, selecting specific fields
    const matchedUsers = await prisma.user.findMany({
      where: {
        email: {
          in: matchedUsersData.map((data) => encryptData(data.email)),
        },
      },
      select: {
        id: true, // Select the id field
        firstName: true, // Select the firstName field
        lastName: true, // Select the lastName field
        email: true, // Select the email field
        personalEmail: true,
        avatar: true, // Select the avatar field
        discussionAvatar: true,
        sex: true, // Select the sex field
        birthday: true,
        college: true, // Select the college field
        createdAt: true,
      },
    });

    const decryptedMatchedUsers = matchedUsers.map((user) => {
      try {
        return {
          ...user,
          firstName: user.firstName ? decryptData(user.firstName) : null,
          lastName: user.lastName ? decryptData(user.lastName) : null,
          email: user.email ? decryptData(user.email) : null,
          personalEmail: user.personalEmail ? decryptData(user.personalEmail) : null,
        };
      } catch (decryptError) {
        console.error(`Decryption failed for user ID ${user.id}:`, decryptError);
        return {
          ...user,
          firstName: "[DECRYPTION FAILED]",
          lastName: "[DECRYPTION FAILED]",
          email: "[DECRYPTION FAILED]",
          personalEmail: "[DECRYPTION FAILED]",
        };
      }
    });
    console.log("decryptedMatchedUsers =>", decryptedMatchedUsers);

    // Calculate average ratings for each matched user based on their review posts targeting the user's userId
    const usersWithRatingsAndStatuses = await Promise.all(
      decryptedMatchedUsers.map(async (matchedUser) => {
        const posts = await prisma.post.findMany({
          where: {
            targetId: matchedUser.id, // Match the targetId with the user's id
            postType: "review", // Only include review posts
          },
          select: {
            rating: true, // Select only the rating field
          },
        });

        // Calculate the average rating
        const rating =
          posts.length > 0
            ? posts.reduce((sum, post) => sum + (post.rating || 0), 0) /
              posts.length
            : 0; // If no posts, averageRating will be 0

        // Find the corresponding match status for the matched user
        const matchData = matchedUsersData.find(
          (data) => data.email === matchedUser.email
        );

        const post = await prisma.post.findFirst({
          where: {
            userId: matchedUser.id,
            targetId: user.id,
          },
        });

        const createdAtDate = matchedUser.createdAt; // Convert createdAt string to date
        const deltaMilliseconds = currentDate - createdAtDate; // Calculate the difference in milliseconds
        const deltaDays = deltaMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days

        return {
          ...matchedUser,
          rating, // Attach the average rating to the user object
          status: matchData ? matchData.status : null, // Attach match status
          email1: matchData.email1,
          email2: matchData.email2,
          email1Status: matchData.email1Status,
          email2Status: matchData.email2Status,
          score: matchData ? matchData.score : 0, // Attach match score
          matchedAt: matchData ? matchData.createdAt : null, // Attach match createdAt
          review: post?.content,
          isNew: deltaDays <= 30, // Determine if the match is new
          isExpired: matchData ? matchData.isExpired : false, // Attach isExpired status
        };
      })
    );

    res.status(200).json(usersWithRatingsAndStatuses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a match
export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { email1, email1Status, email2, email2Status, score } = req.body;

  try {
    const match = await prisma.match.update({
      where: { id: Number(id) },
      data: {
        email1,
        email1Status,
        email2,
        email2Status,
        score: Number(score),
      },
    });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatchStatus = async (req, res) => {
  const { userId } = req.params;
  const { matchedUserId, status } = req.body;

  try {
    // Fetch the user based on userId
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    const decryptedUser = {
      ...user,
      firstName: user.firstName ? decryptData(user.firstName) : null,
      lastName: user.lastName ? decryptData(user.lastName) : null,
      middleName: user.middleName ? decryptData(user.middleName) : null,
      email: user.email ? decryptData(user.email) : null,
    };

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch the matched user based on the provided matchedUserId
    const matchedUser = await prisma.user.findUnique({
      where: {
        id: Number(matchedUserId),
      },
    });

    const decryptedMatchedUser = {
      ...matchedUser,
      firstName: matchedUser.firstName ? decryptData(matchedUser.firstName) : null,
      lastName: matchedUser.lastName ? decryptData(matchedUser.lastName) : null,
      middleName: matchedUser.middleName ? decryptData(matchedUser.middleName) : null,
      email: matchedUser.email ? decryptData(matchedUser.email) : null,
    };

    // Check if the matched user exists
    if (!matchedUser) {
      return res.status(404).json({ error: "Matched user not found." });
    }

    // Check if a match already exists
    let match = await prisma.match.findFirst({
      where: {
        OR: [
          { email1: decryptedUser.email, email2: decryptedMatchedUser.email },
          { email1: decryptedMatchedUser.email, email2: decryptedUser.email },
        ],
      },
    });

    // If no match exists, create a new match record
    if (!match) {
      match = await prisma.match.create({
        data: {
          email1: decryptedUser.email,
          email2: decryptedMatchedUser.email,
          email1Status: status,
          email2Status: "pending", // Assuming the matched user needs to accept as well
        },
      });
    } else {
      // If match exists, update the status to accepted
      match = await prisma.match.update({
        where: { id: match.id },
        data: {
          email1Status:
            match.email1 === decryptedUser.email ? status : match.email1Status,
          email2Status:
            match.email2 === decryptedUser.email ? status : match.email2Status,
        },
      });
    }

    const today = new Date();
    const userBirthday = new Date(decryptedUser.birthday);
    const matchedUserBirthday = new Date(decryptedMatchedUser.birthday);

    if (status === "accepted") {
      await prisma.matchingAction.create({
        data: {
          user1Id: decryptedUser.id,
          user2Id: decryptedMatchedUser.id,
          matchingAction: "accepted"
        },
      });
      if (
        match.email1Status === "accepted" &&
        match.email2Status === "accepted"
      ) {
        await sendEmail({
          email: decryptedUser.personalEmail
            ? decryptedUser.personalEmail
            : decryptedUser.email,
          subject: `Match Approved`,
          html: approvedMatchEmailHTML(
            decryptedMatchedUser.firstName,
            decryptedMatchedUser.avatar,
            today.getFullYear() - matchedUserBirthday.getFullYear(),
            match.score,
            decryptedMatchedUser.summary
          ),
        });
        await sendEmail({
          email: decryptedMatchedUser.personalEmail
            ? decryptedMatchedUser.personalEmail
            : decryptedMatchedUser.email,
          subject: `Match Approved`,
          html: approvedMatchEmailHTML(
            decryptedUser.firstName,
            decryptedUser.avatar,
            today.getFullYear() - userBirthday.getFullYear(),
            match.score,
            decryptedUser.summary
          ),
        });
      }
    } else if (status === "rejected") {
      await prisma.matchingAction.create({
        data: {
          user1Id: decryptedUser.id,
          user2Id: decryptedMatchedUser.id,
          matchingAction: "rejected"
        },
      });
      await sendEmail({
        email: decryptedMatchedUser.personalEmail
          ? decryptedMatchedUser.personalEmail
          : decryptedMatchedUser.email,
        subject: `${decryptedUser.firstName} Match Declined or Expired`,
        html: declinedMatchEmailHTML(
          `${decryptedUser.firstName}`,
          decryptedUser.avatar,
          today.getFullYear() - userBirthday.getFullYear(),
          match.score
        ),
      });
    } else if (status === "reignited") {
      await prisma.matchingAction.create({
        data: {
          user1Id: decryptedUser.id,
          user2Id: decryptedMatchedUser.id,
          matchingAction: "reignited"
        },
      });
      const reigniteCost = await prisma.miscellaneous.findUnique({
        where: { id: 1 },
        select: { reigniteCost: true },
      });
      const amountToReduce = decryptedUser.balance < reigniteCost ? decryptedUser.balance : reigniteCost;
      const amountToMakeExtraPayment =
        decryptedUser.balance < reigniteCost ? reigniteCost - decryptedUser.balance : 0;

      // Decrease the user's balance
      const updatedUser = await prisma.user.update({
        where: { id: decryptedUser.id },
        data: { balance: decryptedUser.balance - amountToReduce },
      });

      // Save transaction to your database
      await prisma.userTransactions.create({
        data: {
          userId: decryptedUser.id,
          paymentIntentId: `pi_b_${Date.now()}_${decryptedUser.id}`,
          amount: Math.round(amountToReduce * 100),
          paymentMethod: "Balance",
          description: `Reignite ${decryptedUser.firstName} ${today.getFullYear() - userBirthday.getFullYear()}`,
          status: "succeeded", // e.g., 'succeeded'
        },
      });

      // If there's extra payment needed, create a PaymentIntent
      if (amountToMakeExtraPayment > 0) {
        const customers = await stripe.customers.list({ limit: 1000 });
        const customer = customers.data.find(
          (c) => Number(c.metadata.userId) === decryptedUser.id
        );

        if (!customer) {
          return res
            .status(404)
            .json({
              error: "You must add a payment method before checking out.",
            });
        }

        // Create a PaymentIntent using the customer's default payment method
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amountToMakeExtraPayment * 100), // Amount in cents
          currency: "usd",
          customer: customer.id,
          payment_method: decryptedUser.paymentMethodId,
          confirm: true, // Automatically confirm the payment
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
          },
          metadata: {
            description: description, // Add description here
          },
        });

        // Save transaction to your database
        await prisma.userTransactions.create({
          data: {
            userId: decryptedUser.id,
            paymentIntentId: paymentIntent.id,
            paymentMethod: "Stripe",
            amount: paymentIntent.amount,
            description: paymentIntent.metadata.description,
            status: paymentIntent.status, // e.g., 'succeeded'
          },
        });
      }
      await sendEmail({
        email: decryptedMatchedUser.personalEmail
          ? decryptedMatchedUser.personalEmail
          : decryptedMatchedUser.email,
        subject: `Reignite ${decryptedMatchedUser.firstName} ${decryptedMatchedUser.lastName} ${
          today.getFullYear() - matchedUserBirthday.getFullYear()
        }`,
        html: reigniteMatchEmailHTML(
          `${decryptedMatchedUser.firstName} ${decryptedMatchedUser.lastName}`,
          today.getFullYear() - matchedUserBirthday.getFullYear()
        ),
      });
    }

    // Respond with the updated match information
    res
      .status(200)
      .json({ message: "Match status updated successfully.", match });
  } catch (error) {
    console.error("Error in acceptMatch:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a match
export const deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.match.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to add data to the matching_action_tbl and update matches_tbl
export const addMatchingAction = async (req, res) => {
  const { user1Id, user2Id, matchingAction } = req.body;

  // Validate the input
  if (!user1Id || !user2Id || !matchingAction) {
    return res
      .status(400)
      .json({ error: "user1Id, user2Id, and matchingAction are required" });
  }

  try {
    // Fetch emails for user1Id and user2Id from the User table
    const user1 = await prisma.user.findUnique({
      where: { id: parseInt(user1Id, 10) },
    });

    const decryptedUser1 = {
      ...user1,
      firstName: user1.firstName ? decryptData(user1.firstName) : null,
      lastName: user1.lastName ? decryptData(user1.lastName) : null,
      middleName: user1.middleName ? decryptData(user1.middleName) : null,
      email: user1.email ? decryptData(user1.email) : null,
    };

    const user2 = await prisma.user.findUnique({
      where: { id: parseInt(user2Id, 10) },
    });

    const decryptedUser2 = {
      ...user2,
      firstName: user2.firstName ? decryptData(user2.firstName) : null,
      lastName: user2.lastName ? decryptData(user2.lastName) : null,
      middleName: user2.middleName ? decryptData(user2.middleName) : null,
      email: user2.email ? decryptData(user2.email) : null,
    };

    if (!user1 || !user2) {
      return res.status(404).json({ error: "One or more users not found" });
    }

    const user1Email = decryptedUser1.email;
    const user2Email = decryptedUser2.email;

    // Create a new matching action record
    const newMatchingAction = await prisma.matchingAction.create({
      data: {
        user1Id: parseInt(user1Id, 10),
        user2Id: parseInt(user2Id, 10),
        matchingAction,
      },
    });

    // Determine which email status to update in the matches_tbl
    const match = await prisma.match.findFirst({
      where: {
        OR: [
          { email1: user1Email, email2: user2Email },
          { email1: user2Email, email2: user1Email },
        ],
      },
    });

    if (!match) {
      return res
        .status(404)
        .json({ error: "Match not found for the given user emails" });
    }

    // Update the email1_status or email2_status based on the matching action
    const updatedMatch = await prisma.match.update({
      where: { id: match.id },
      data: {
        email1Status:
          match.email1 === user1Email ? matchingAction : match.email1Status,
        email2Status:
          match.email2 === user1Email ? matchingAction : match.email2Status,
      },
    });

    // Send response
    return res.status(201).json({
      message: "Matching action added and match status updated successfully",
      data: {
        matchingAction: newMatchingAction,
        updatedMatch,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Controller to get matched user data for a given user ID.
 * @param {*} req - The request object (expects `req.params.userId` as the user ID).
 * @param {*} res - The response object (used to send the API response).
 */
export const getMatchedUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Parse and validate userId as an integer
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      return res.status(400).json({ message: "Invalid User ID format." });
    }

    // Step 1: Fetch the user's email using the user's ID
    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
      select: { email: true }, // Only fetch the email
    });

    const decryptedUser = {
      ...user,
      email: user.email ? decryptData(user.email) : null,
    };

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userEmail = decryptedUser.email;

    // Step 2: Fetch all matches where the user's email is involved
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ email1: userEmail }, { email2: userEmail }],
      },
    });

    // Check if any matches exist
    if (!matches || matches.length === 0) {
      return res
        .status(404)
        .json({ message: "No matches found for the user." });
    }

    // Step 3: Process and format each match
    const matchedUserData = await Promise.all(
      matches.map(async (match) => {
        // Identify the matched user's email (opposite of the requesting user's email)
        const matchedUserEmail =
          match.email1 === userEmail ? match.email2 : match.email1;

        // Fetch details of the matched user using their email
        const matchedUser = await prisma.user.findUnique({
          where: { email: matchedUserEmail },
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        });

        const decryptedMatchedUser = {
          ...matchedUser,
          firstName: matchedUser.firstName ? decryptData(matchedUser.firstName) : null,
          lastName: matchedUser.lastName ? decryptData(matchedUser.lastName) : null,
          middleName: matchedUser.middleName ? decryptData(matchedUser.middleName) : null,
        };

        if (!matchedUser) {
          return null; // Match exists but the user does not, avoid breaking
        }

        // Fetch related matching actions between the two users
        const matchingActions = await prisma.matchingAction.findMany({
          where: {
            user1Id: numericUserId,
            user2Id: decryptedMatchedUser.id,
          },
        });

        // Extract the dates of specific actions
        const acceptedDate =
          matchingActions.find((action) => action.matchingAction === "accepted")
            ?.createdAt || null;
        const rejectedDate =
          matchingActions.find((action) => action.matchingAction === "rejected")
            ?.createdAt || null;
        const reignitedDate =
          matchingActions.find(
            (action) => action.matchingAction === "reignited"
          )?.createdAt || null;

        // Format the resulting matched data
        return {
          name: `${decryptedMatchedUser.firstName} ${decryptedMatchedUser.middleName || ""} ${
            decryptedMatchedUser.lastName
          }`.trim(),
          score: match.score || null,
          matchedDate: match.createdAt?.toISOString() || null,
          acceptedDate: acceptedDate?.toISOString() || null,
          rejectedDate: rejectedDate?.toISOString() || null,
          reignitedDate: reignitedDate?.toISOString() || null,
          lastActivity: match.updatedAt?.toISOString() || null,
        };
      })
    );

    // Step 4: Remove null results and send the response
    const filteredMatchedUserData = matchedUserData.filter(
      (data) => data !== null
    );
    return res.status(200).json(filteredMatchedUserData);
  } catch (error) {
    console.error("Error fetching matched user data:", error);
    return res.status(500).json({
      message: "Failed to fetch matched user data.",
      error: error.message,
    });
  }
};

// Run every hour
cron.schedule("0 * * * *", async () => {
  try {
    const expiredMatches = await prisma.match.findMany({
      where: {
        expiration: {
          lt: new Date(),
        },
        expirationEmailSent: false,
      },
    });

    for (const match of expiredMatches) {
      const existingUser1 = await prisma.user.findUnique({
        where: {
          email: encryptData(email1),
        },
      });

      const decryptedExistingUser1 = {
        ...existingUser1,
        firstName: existingUser1.firstName ? decryptData(existingUser1.firstName) : null,
        lastName: existingUser1.lastName ? decryptData(existingUser1.lastName) : null,
        middleName: existingUser1.middleName ? decryptData(existingUser1.middleName) : null,
        email: existingUser1.email ? decryptData(existingUser1.email) : null,
      };

      const existingUser2 = await prisma.user.findUnique({
        where: {
          email: encryptData(email2),
        },
      });

      const decryptedExistingUser2 = {
        ...existingUser2,
        firstName: existingUser2.firstName ? decryptData(existingUser2.firstName) : null,
        lastName: existingUser2.lastName ? decryptData(existingUser2.lastName) : null,
        middleName: existingUser2.middleName ? decryptData(existingUser2.middleName) : null,
        email: existingUser2.email ? decryptData(existingUser2.email) : null,
      };

      const today = new Date();
      const user1Birthday = new Date(decryptedExistingUser1.birthday);
      const user2Birthday = new Date(decryptedExistingUser2.birthday);

      await sendEmail({
        email: decryptedExistingUser1.personalEmail
          ? decryptedExistingUser1.personalEmail
          : decryptedExistingUser1.email,
        subject: `${decryptedExistingUser2.firstName} Match Declined or Expired`,
        html: declinedMatchEmailHTML(
          `${decryptedExistingUser2.firstName}`,
          decryptedExistingUser2.avatar,
          today.getFullYear() - user2Birthday.getFullYear(),
          match.score
        ),
      });

      await sendEmail({
        email: decryptedExistingUser2.personalEmail
          ? decryptedExistingUser2.personalEmail
          : decryptedExistingUser2.email,
        subject: `${decryptedExistingUser1.firstName} Match Declined or Expired`,
        html: declinedMatchEmailHTML(
          `${decryptedExistingUser1.firstName}`,
          decryptedExistingUser1.avatar,
          today.getFullYear() - user1Birthday.getFullYear(),
          match.score
        ),
      });

      await prisma.match.update({
        where: { id: match.id },
        data: { expirationEmailSent: true },
      });
    }

    console.log(`[Cron] Processed ${expiredMatches.length} expired matches.`);
  } catch (error) {
    console.error("Cron job error:", error);
    res.status(500).json({ error: error.message });
  }
});
