import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bycript from "bcryptjs";
import crypto from "crypto";

import { sendEmail } from "../utils/email.js";
import {
  resetPwdEmailHTML,
  verifyEmailHTMLByTokenLink,
} from "../utils/emailTemplate.js";

const prisma = new PrismaClient();

const refreshTokenCookieOptions = {
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Extract domain from email
    const emailDomain = email.split("@")[1];

    // Check if the college exists with the given email domain
    const colleges = await prisma.college.findMany();

    const college = colleges.find((college) =>
      emailDomain.includes(college.emailDomain)
    );

    // If college does not exist, return an error
    if (!college) {
      return res
        .status(400)
        .json({ error: "Email domain not associated with any college." });
    }

    const hashedPassword = await bycript.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const tokenExpiration = new Date(Date.now() + 3600000);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiration: tokenExpiration, // 1 hour expiration
        college: college.college,
        birthday: dateOfBirth,
      },
    });

    const verificationLink = `https://app.lovestory.ai/signup-questionnaire?token=${verificationToken}&userId=${newUser.id}`;

    await sendEmail({
      email: newUser.personalEmail ? newUser.personalEmail : newUser.email,
      subject: "Verify Your Email Address",
      html: verifyEmailHTMLByTokenLink(verificationLink),
    });

    return res
      .status(201)
      .json({ message: "A new User created", userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, session, timezone, ipv4, ipv6 } = req.body;

    // Find the user by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ message: "Unregistered Email address." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bycript.compare(
      password,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Create payload for JWT tokens
    const payload = {
      userId: existingUser.id,
      email: existingUser.email,
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
      where: { id: existingUser.id },
      data: { refreshToken: refreshToken },
    });

    // Store session data in the UserSession table
    await prisma.userSession.create({
      data: {
        userId: existingUser.id,
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
      message: "Login success.",
      accessToken,
      user: {
        userId: existingUser.id,
        email: existingUser.email,
        fullName: existingUser.firstName + " " + existingUser.lastName,
        emailVerified: existingUser.emailVerified,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await prisma.user.findUnique({ where: { refreshToken } });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRATION,
          }
        );

        return res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // const user = req.user; // Assuming `req.user` contains the authenticated user's information
    const { userId, session, ipv4 } = req.body; // Session (device name) and IPv4 address from the client

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      console.log("No refresh token");
      // return res.sendStatus(204); // No content, user is already logged out
    }

    // Clear the refresh token from the User table
    // await prisma.user.update({
    //   where: { refreshToken },
    //   data: { refreshToken: null },
    // });

    // Update the loggedoutAt field in the UserSession table
    await prisma.userSession.updateMany({
      where: {
        userId: Number(userId), // Match the user ID
        session: session, // Match the device name (session)
        ipv4: ipv4, // Match the IPv4 address
      },
      data: {
        loggedoutAt: new Date(), // Set the current timestamp
      },
    });

    // Clear the refresh token cookie
    res.clearCookie("refreshToken");

    return res.sendStatus(204); // Successfully logged out
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch sessions for the given userId
    const sessions = await prisma.userSession.findMany({
      where: {
        userId: parseInt(userId, 10), // Ensure userId is an integer
      },
      orderBy: {
        createdAt: "desc", // Sort by createdAt in descending order (most recent session first)
      },
    });

    // Check if any sessions were found
    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for the given user ID." });
    }

    // Return the sessions
    return res.status(200).json({
      message: "Sessions retrieved successfully.",
      sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching sessions." });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    // Find the user by token
    const user = await prisma.user.findUnique({
      where: {
        verificationToken: token,
      },
    });

    if (!user) {
      return res.status(400).send("Invalid token or user not found.");
    }

    // console.log("User:", user);
    // console.log("Now:", new Date());
    // console.log("verificationTokenExpiration:", user.verificationTokenExpiration);
    // Check if the token has expired
    if (new Date() > user.verificationTokenExpiration) {
      return res.status(400).send("Token has expired.");
    }

    // Mark the email as verified
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
      },
    });
    res.status(200).json({
      message: "Email verified successfully!",
      id: updatedUser.id,
      emailVerified: updatedUser.emailVerified,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    // If user not found, respond with a message indicating so
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }

    // If user exists, generate a password reset token (you may need to implement this function)
    // For demonstration, we assume generateResetToken is a function that generates a unique token
    const resetToken = generateVerificationToken();
    const tokenExpiration = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: {
        email: email.trim(),
      },
      data: {
        resetPwdToken: resetToken,
        resetPwdTokenExpiration: tokenExpiration,
      },
    });

    // Construct the password reset email
    const resetLink = `https://app.lovestory.ai/reset-password?token=${resetToken}&email=${email}`;

    // Send the reset password email
    await sendEmail({
      email: user.personalEmail ? user.personalEmail : user.email,
      subject: "Reset your password",
      html: resetPwdEmailHTML(resetLink),
    });

    // Respond with a success message
    res.status(200).json({ message: "Reset password email has been sent." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: error.message });
  }
};

export const resetPwd = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    // If user not found, respond with a message indicating so
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }

    // Verify the reset token (implement your own logic to verify the token)
    if (user.resetPwdToken !== token) {
      return res.status(400).send("Invalid token.");
    }

    // Check if the token has expired
    if (new Date() > user.resetPwdTokenExpiration) {
      return res.status(400).send("Token has expired.");
    }

    // Hash the new password before saving it
    const hashedPassword = await bycript.hash(newPassword, 10); // 10 is the salt rounds

    // Update the user's password in the database
    await prisma.user.update({
      where: { email: email.trim() },
      data: { password: hashedPassword },
    });

    // Respond with a success message
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: error.message });
  }
};
