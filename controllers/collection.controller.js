import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new collection with visibility values
export const createCollection = async (req, res) => {
  const {
    name,
    collectionOrder,
    description,
    status,
    fileId,
    visibilityValues,
  } = req.body;

  try {
    // Check if a collection with the same name already exists
    const existingCollectionByName = await prisma.collection.findUnique({
      where: { name },
    });

    // Check if a collection with the same collectionOrder already exists
    const existingCollectionByOrder = await prisma.collection.findUnique({
      where: { collectionOrder: Number(collectionOrder) },
    });

    if (existingCollectionByName) {
      return res.status(400).json({ error: "Collection name must be unique" });
    }

    if (existingCollectionByOrder) {
      return res
        .status(400)
        .json({ error: "Collection collection order must be unique" });
    }

    // Create the collection
    const newCollection = await prisma.collection.create({
      data: {
        name,
        collectionOrder: Number(collectionOrder),
        description,
        status,
        fileId: Number(fileId),
      },
    });

    // Create associated visibility records if provided
    if (visibilityValues && visibilityValues.length > 0) {
      const visibilityData = visibilityValues.map((value) => ({
        collectionId: newCollection.id,
        visibilityValue: value.visibilityValue,
        visibilityValueType: value.visibilityValueType,
        status: value.status,
      }));

      // Create visibility records in bulk
      await prisma.collectionVisibility.createMany({ data: visibilityData });
    }

    return res.status(201).json(newCollection);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating collection", error: error.message });
  }
};

// Get all collections with their visibility values
export const getCollections = async (req, res) => {
  try {
    const collections = await prisma.collection.findMany(); // Get all collections
    const collectionIds = collections.map((collection) => collection.id); // Extract collection IDs

    // Fetch visibility values for all collections based on their IDs
    const visibilityValues = await prisma.collectionVisibility.findMany({
      where: {
        collectionId: { in: collectionIds }, // Filter by the IDs of the collections
      },
    });

    // Map visibility values to each collection
    const collectionsWithVisibility = collections.map((collection) => ({
      ...collection,
      visibilityValues: visibilityValues.filter(
        (visibility) => visibility.collectionId === collection.id
      ), // Filter visibility values for the collection
    }));

    return res.status(200).json(collectionsWithVisibility);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching collections",
      error: error.message,
    });
  }
};

// Get all collections view data
export const getCollectionsView = async (req, res) => {
  try {
    // Fetch all collections from the collections_view table
    const collectionsView = await prisma.collectionsView.findMany();

    // Use Promise.all to await all async operations in the map
    const collectionsViewWithLikes = await Promise.all(
      collectionsView.map(async (collection) => {
        const videos = await prisma.video.findMany({
          where: {
            collectionId: collection.id,
          },
        });

        // Use Promise.all to await all like counts
        const videoLikes = await Promise.all(
          videos.map(async (video) => {
            return await prisma.userVideoLikes.count({
              where: {
                videoId: video.id,
              },
            });
          })
        );

        // Sum all likes
        const totalLikes = videoLikes.reduce((sum, likes) => sum + likes, 0);

        // Return the collection with the likes property
        return {
          ...collection,
          likes: totalLikes,
        };
      })
    );

    return res.status(200).json(collectionsViewWithLikes);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching collections view data",
      error: error.message,
    });
  }
};

// Get a single collection by ID with its visibility values
export const getCollectionById = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await prisma.collection.findUnique({
      where: { id: Number(id) },
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Fetch visibility values for the specific collection ID
    const visibilityValues = await prisma.collectionVisibility.findMany({
      where: { collectionId: Number(id) },
    });

    return res.status(200).json({
      ...collection,
      visibilityValues, // Add visibility values to the response
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching collection",
      error: error.message,
    });
  }
};

// Update a collection
export const updateCollection = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    collectionOrder,
    description,
    status,
    fileId,
    visibilityValues,
  } = req.body;

  try {
    // Check if a collection with the same name exists, but not the one we're updating
    const existingCollectionByName = await prisma.collection.findFirst({
      where: {
        name,
        NOT: { id: Number(id) }, // Exclude current collection
      },
    });

    // Check if a collection with the same collectionOrder exists, but not the one we're updating
    const existingCollectionByOrder = await prisma.collection.findFirst({
      where: {
        collectionOrder: Number(collectionOrder),
        NOT: { id: Number(id) }, // Exclude current collection
      },
    });

    if (existingCollectionByName) {
      return res.status(400).json({ error: "Collection name must be unique" });
    }

    if (existingCollectionByOrder) {
      return res
        .status(400)
        .json({ error: "Collection collection order must be unique" });
    }

    // Update the collection
    const updatedCollection = await prisma.collection.update({
      where: { id: Number(id) },
      data: {
        name,
        collectionOrder: Number(collectionOrder),
        description,
        status,
        fileId: Number(fileId),
      },
    });

    // Update visibility records if visibilityValues are provided
    if (visibilityValues) {
      await prisma.collectionVisibility.deleteMany({
        where: { collectionId: Number(id) }, // Remove old visibility records
      });

      const visibilityData = visibilityValues.map((value) => ({
        collectionId: Number(id),
        visibilityValue: value.visibilityValue,
        visibilityValueType: value.visibilityValueType,
        status: value.status,
      }));

      // Create new visibility records
      await prisma.collectionVisibility.createMany({ data: visibilityData });
    }

    return res.status(200).json(updatedCollection);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating collection", error: error.message });
  }
};

// Delete a collection
export const deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete associated visibility records
    await prisma.collectionVisibility.deleteMany({
      where: { collectionId: Number(id) },
    });

    // Then, delete the collection
    await prisma.collection.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send(); // No content
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting collection", error: error.message });
  }
};

// Create or update collection visibility
export const createOrUpdateVisibility = async (req, res) => {
  const { collectionId, visibilityValue, visibilityValueType, status } =
    req.body;

  try {
    const visibility = await prisma.collectionVisibility.upsert({
      where: { collectionId: Number(collectionId) },
      update: {
        visibilityValue,
        visibilityValueType,
        status,
      },
      create: {
        collectionId: Number(collectionId),
        visibilityValue,
        visibilityValueType,
        status,
      },
    });
    return res.status(200).json(visibility);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating or updating visibility",
      error: error.message,
    });
  }
};
