import { PrismaClient } from "@prisma/client";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { decryptData } from "../utils/encryption.js";

const prisma = new PrismaClient();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
  secretOrKey: process.env.JWT_SECRET, // Use your JWT secret
};

const passportJWTStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Fetch the user by ID from the JWT payload
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.userId }, // Adjust according to your user model
    });

    if (user) {
      const decryptedUser = {
        ...user,
        firstName: user.firstName ? decryptData(user.firstName) : null,
        lastName: user.lastName ? decryptData(user.lastName) : null,
        middleName: user.middleName ? decryptData(user.middleName) : null,
        email: user.email ? decryptData(user.email) : null,
      };
      // Return the user if found
      return done(null, decryptedUser);
    } else {
      // Return false if user not found
      return done(null, false);
    }
  } catch (error) {
    console.error(`Error in Passport JWT strategy: ${error}`);
    return done(error, false); // Pass the error to the done callback
  }
});

export default passportJWTStrategy;
