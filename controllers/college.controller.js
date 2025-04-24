import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new college
export const createCollege = async (req, res) => {
  const { emailDomain, college } = req.body;

  if (!emailDomain || !college) {
    return res
      .status(400)
      .json({ error: "emailDomain and college fields are required." });
  }

  try {
    const existingCollege = await prisma.college.findFirst({
      where: {
        OR: [{ emailDomain }, { college }],
      },
    });

    if (existingCollege) {
      return res.status(409).json({
        error: "College with this emailDomain or college name already exists.",
      });
    }
    const newCollege = await prisma.college.create({
      data: {
        emailDomain,
        college,
      },
    });
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(500).json({ error: "Error creating college." });
  }
};

// Read all colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await prisma.college.findMany();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving colleges." });
  }
};

// Read all colleges_view
export const getCollegesView = async (req, res) => {
  try {
    // Fetch all colleges
    const colleges = await prisma.college.findMany();

    const results = await Promise.all(
      colleges.map(async (college) => {
        const collegeDomain = college.emailDomain; // using email domain for matching

        // Total users count for the college
        const userCount = await prisma.user.count({
          where: { college: college.college, sex: { not: null } },
        });

        // Active users count (at least one login session)
        const userIdsWithSessions = await prisma.userSession.groupBy({
          by: ["userId"],
          where: {
            userId: {
              in: await prisma.user
                .findMany({
                  where: { college: college.college },
                  select: { id: true },
                })
                .then((users) => users.map((user) => user.id)),
            },
          },
          _count: {
            userId: true,
          },
        });

        // The result will contain userId and the count of sessions for each userId

        const activeCount = userIdsWithSessions.length;

        // Paid users count
        const paidCount = await prisma.user.count({
          where: {
            college: college.college,
            premiumName: { not: null },
          },
        });

        // Free users count
        const freeCount = userCount - paidCount;

        // Matches count
        const matchCount = await prisma.match.count({
          where: {
            OR: [
              { email1: { contains: collegeDomain } },
              { email2: { contains: collegeDomain } },
            ],
          },
        });

        // Accepted matches count
        const acceptedCount = await prisma.match.count({
          where: {
            OR: [
              { email1: { contains: collegeDomain }, email1Status: "accepted" },
              { email2: { contains: collegeDomain }, email2Status: "accepted" },
            ],
          },
        });

        // Gender statistics
        const users = await prisma.user.findMany({
          where: { 
            college: college.college, 
            sex: { 
              not: null 
            } 
          },
          select: { sex: true },
        });

        const maleCount = users.filter((user) => user.sex === "male").length;
        const femaleCount = users.filter(
          (user) => user.sex === "female"
        ).length;

        const malePercentage =
          userCount > 0 ? (maleCount / userCount) * 100 : 0;
        const femalePercentage =
          userCount > 0 ? (femaleCount / userCount) * 100 : 0;

        // Revenue calculation from transactions
        const transactions = await prisma.userTransactions.findMany({
          where: {
            userId: {
              in: await prisma.user
                .findMany({
                  where: { college: college.college },
                  select: { id: true },
                })
                .then((users) => users.map((user) => user.id)),
            },
          },
        });

        const revenue = transactions.reduce((sum, tx) => {
          if (tx.description?.includes("Subscription")) {
            return sum + (tx.amount || 0);
          }
          if (tx.description?.includes("Information purchase")) {
            return sum + (tx.amount || 0); // Half information revenue
          }
          if (tx.description?.includes("Information revenue share")) {
            return sum + (tx.amount / 2 || 0); // Half information revenue
          }
          return sum;
        }, 0);

        const share = transactions.reduce((sum, tx) => {
          if (tx.description?.includes("information")) {
            return sum + (tx.amount / 2 || 0); // Half information revenue for share
          }
          return sum;
        }, 0);

        return {
          id: college.id,
          college: college.college,
          users: userCount,
          active: activeCount,
          paid: paidCount,
          free: freeCount,
          matches: matchCount,
          accepted: acceptedCount,
          male: malePercentage,
          female: femalePercentage,
          revenue,
          share,
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching college statistics:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

// Get college statistics view
export const getCollegeStatistics = async (req, res) => {
  const { collegeId } = req.params;

  try {
    const college = await prisma.collegesView.findUnique({
      where: { id: Number(collegeId) },
    });
    if (!college) {
      return res.status(404).json({ error: "College not found." });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all college_users_view
export const getCollegeUsersViewByCollegeId = async (req, res) => {
  const { collegeId } = req.params;

  try {
    // Retrieve college name from the given collegeId
    const collegeDetails = await prisma.college.findUnique({
      where: { id: Number(collegeId) },
      select: { college: true },
    });

    // If no college found, return error
    if (!collegeDetails) {
      return res.status(404).json({ error: "College not found" });
    }

    const collegeName = collegeDetails.college;

    // Fetch users for the specified college by college name
    const users = await prisma.user.findMany({
      where: { college: collegeName, sex: { not: null } }, // Use the college name to filter users
      select: {
        id: true,
        firstName: true,
        lastName: true,
        sex: true,
        createdAt: true,
        email: true,
        premiumName: true,
        premiumEndsAt: true,
      },
    });

    const results = await Promise.all(
      users.map(async (user) => {
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
            tx.description?.includes("Information purchase")
          ) {
            return total + (tx.amount || 0);
          }
          return total;
        }, 0);

        // Share calculation from information revenue
        const share = transactions.reduce((total, tx) => {
          if (tx.description?.includes("Information revenue share")) {
            return total + (tx.amount / 2 || 0);
          }
          return total;
        }, 0);

        return {
          userId: user.id,
          fullName,
          collegeId: collegeId, // Use the provided collegeId
          college: collegeName, // Retrieve name from college table
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
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

// Read a single college by ID
export const getCollegeById = async (req, res) => {
  const { id } = req.params;

  try {
    const college = await prisma.college.findUnique({
      where: { id: Number(id) },
    });
    if (!college) {
      return res.status(404).json({ error: "College not found." });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving college." });
  }
};

// Update a college
export const updateCollege = async (req, res) => {
  const { id } = req.params;
  const { emailDomain, college } = req.body;

  try {
    const updatedCollege = await prisma.college.update({
      where: { id: Number(id) },
      data: {
        emailDomain,
        college,
      },
    });
    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(500).json({ error: "Error updating college." });
  }
};

// Delete a college
export const deleteCollege = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCollege = await prisma.college.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedCollege);
  } catch (error) {
    res.status(500).json({ error: "Error deleting college." });
  }
};
