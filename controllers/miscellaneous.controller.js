import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create or Update Miscellaneous entry
export const upsertMiscellaneous = async (req, res) => {
  const {
    regularMatchDeadline,
    subscriberMatchDeadline,
    regularInfoSpendingLimit,
    subscriberInfoSpendingLimit,
    reigniteCost,
    numberOfUsers
  } = req.body;

  try {
    // Try to find an existing Miscellaneous entry
    const existing = await prisma.miscellaneous.findFirst();

    if (existing) {
      // If it exists, update the entry
      const updatedMiscellaneous = await prisma.miscellaneous.update({
        where: { id: existing.id }, // Assuming there's only one entry
        data: {
          regularMatchDeadline: Number(regularMatchDeadline),
          subscriberMatchDeadline: Number(subscriberMatchDeadline),
          regularInfoSpendingLimit: Number(regularInfoSpendingLimit),
          subscriberInfoSpendingLimit: Number(subscriberInfoSpendingLimit),
          reigniteCost: Number(reigniteCost),
          numberOfUsers: Number(numberOfUsers),
        },
      });

      return res
        .status(200)
        .json({
          message: "Miscellaneous entry updated.",
          updatedMiscellaneous,
        });
    } else {
      // If it doesn't exist, create a new entry
      const newMiscellaneous = await prisma.miscellaneous.create({
        data: {
          regularMatchDeadline: Number(regularMatchDeadline),
          subscriberMatchDeadline: Number(subscriberMatchDeadline),
          regularInfoSpendingLimit: Number(regularInfoSpendingLimit),
          subscriberInfoSpendingLimit: Number(subscriberInfoSpendingLimit),
          reigniteCost: Number(reigniteCost),
          numberOfUsers: Number(numberOfUsers),
        },
      });

      return res
        .status(201)
        .json({ message: "Miscellaneous entry created.", newMiscellaneous });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

// Read the Miscellaneous entry
export const getMiscellaneous = async (req, res) => {
  try {
    const miscellaneousItem = await prisma.miscellaneous.findFirst();

    if (!miscellaneousItem) {
      return res
        .status(404)
        .json({ message: "Miscellaneous entry not found." });
    }

    res.status(200).json(miscellaneousItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Miscellaneous entry." });
  }
};
