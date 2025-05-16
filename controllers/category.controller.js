import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new Category along with associated CategoryVisibility records
export const createCategory = async (req, res) => {
  const {
    name,
    description,
    row,
    categoryOrder,
    fileId,
    status,
    visibilityValues,
  } = req.body;

  try {
    // Check if a category with the same name already exists
    const existingCategoryByName = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategoryByName) {
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // First, create the category
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
        row,
        categoryOrder: Number(categoryOrder),
        fileId,
        status,
      },
    });

    // If visibilityValues were provided, create them as well
    if (visibilityValues && visibilityValues.length > 0) {
      const categoryVisibilityData = visibilityValues.map((value) => ({
        categoryId: newCategory.id, // Link the visibility data to the new category
        visibilityValue: value.visibilityValue,
        visibilityValueType: value.visibilityValueType,
        status: value.status,
      }));

      // Create all CategoryVisibility records for the newly created category
      await prisma.categoryVisibility.createMany({
        data: categoryVisibilityData,
      });
    }

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Category by ID
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const {
    name,
    description,
    row,
    categoryOrder,
    fileId,
    status,
    visibilityValues,
  } = req.body;

  try {
    // Check for uniqueness before updating
    const existingCategoryByName = await prisma.category.findUnique({
      where: { name },
    });

    if (
      existingCategoryByName &&
      existingCategoryByName.id !== Number(categoryId)
    ) {
      return res.status(400).json({ error: "Category name must be unique" });
    }

    // Update the category
    const updatedCategory = await prisma.category.update({
      where: { id: Number(categoryId) },
      data: {
        name,
        description,
        row,
        categoryOrder: Number(categoryOrder),
        fileId,
        status,
      },
    });

    if (visibilityValues.length === 0) {
      // First, delete any existing visibility records not in the update
      const existingVisibilityList = await prisma.categoryVisibility.findMany({
        where: { categoryId: updatedCategory.id },
      });
      const existingVisibilityIds = existingVisibilityList.map((vis) => vis.id);
      // Delete any visibility records that are not present in the request
      await prisma.categoryVisibility.deleteMany({
        where: { id: { in: existingVisibilityIds } },
      });
    }

    // If visibilityValues were provided, update them as well
    if (visibilityValues && visibilityValues.length > 0) {
      const visibilityData = visibilityValues.map((value) => ({
        categoryId: updatedCategory.id, // Link the visibility data to the updated category
        visibilityValue: value.visibilityValue,
        visibilityValueType: value.visibilityValueType,
        status: value.status,
      }));

      // First, delete any existing visibility records not in the update
      const existingVisibilityList = await prisma.categoryVisibility.findMany({
        where: { categoryId: updatedCategory.id },
      });

      const existingVisibilityIds = existingVisibilityList.map((vis) => vis.id);

      // Delete any visibility records that are not present in the request
      await prisma.categoryVisibility.deleteMany({
        where: { id: { in: existingVisibilityIds } },
      });

      // Upsert new visibility records (update if exists, otherwise insert)
      await prisma.categoryVisibility.createMany({
        data: visibilityData,
      });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete related CategoryVisibility records
    await prisma.categoryVisibility.deleteMany({
      where: { categoryId: Number(id) },
    });

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Category by ID along with related CategoryVisibility records
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the category
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    // If the category does not exist, return 404
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch related CategoryVisibility records based on categoryId
    const categoryVisibilities = await prisma.categoryVisibility.findMany({
      where: { categoryId: Number(id) },
    });

    // Combine the results
    const result = {
      ...category,
      categoryVisibility: categoryVisibilities,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Categories along with their related CategoryVisibility records
export const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await prisma.category.findMany();

    // Fetch all related CategoryVisibility records
    const allVisibilityRecords = await prisma.categoryVisibility.findMany();

    // Combine categories with their visibility records
    const result = categories.map((category) => {
      // Filter visibility records for the current category
      const visibilityRecords = allVisibilityRecords.filter(
        (vis) => vis.categoryId === category.id
      );
      return {
        ...category,
        categoryVisibility: visibilityRecords,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Categories along with their related CategoryVisibility records
export const getCategoriesView = async (req, res) => {
  try {
    // Fetch all categories view
    const categories = await prisma.categoriesView.findMany();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Categories along with their related CategoryVisibility records
export const getCategoriesVisibility = async (req, res) => {
  try {
    // Fetch all categories visibility
    const categoriesVisibility = await prisma.categoryVisibility.findMany();

    res.status(200).json(categoriesVisibility);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle status for a specific category
export const toggleCategoryStatus = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Find the category by ID
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    // Check if the category exists
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Toggle the status
    const newStatus = category.status === "active" ? "inactive" : "active";

    // Update the category status
    const updatedCategory = await prisma.category.update({
      where: { id: Number(categoryId) },
      data: { status: newStatus },
    });

    // Return the updated category
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Method to get categories grouped by row with file URLs and favorite categories
export const getCategoriesGroupedByRow = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all categories
    const categories = await prisma.category.findMany();

    // Fetch all related CategoryVisibility records
    const allVisibilityRecords = await prisma.categoryVisibility.findMany();

    // Combine categories with their visibility records
    const categoriesWithVisibility = categories.map((category) => {
      // Filter visibility records for the current category
      const visibilityRecords = allVisibilityRecords.filter(
        (vis) => vis.categoryId === category.id
      );
      return {
        ...category,
        categoryVisibility: visibilityRecords,
      };
    });

    // Fetch all files that correspond to the categories
    const fileIds = categoriesWithVisibility
      .filter((category) => category.fileId !== null) // Filter out categoriesWithVisibility without a fileId
      .map((category) => category.fileId);

    let files = [];
    if (fileIds.length > 0) {
      files = await prisma.file.findMany({
        where: {
          id: { in: fileIds },
        },
        select: {
          id: true,
          fileUrl: true,
        },
      });
    }

    // Create a mapping of fileId to fileUrl
    const fileMap = files.reduce((acc, file) => {
      acc[file.id] = file.fileUrl;
      return acc;
    }, {});

    // Fetch favorite categoriesWithVisibility for the user
    const favoriteCategories = await prisma.userFavoCategory.findMany({
      where: { userId: Number(userId) }, // Ensure userId is a number
      select: { categoryId: true }, // Get only the categoryId
    });

    // Create a set of favorite category IDs
    const favoriteCategoryIds = new Set(
      favoriteCategories.map((fave) => fave.categoryId)
    );

    // Initialize the result object
    const groupedCategories = {
      Favourite: [], // For favorites
      rows: {}, // For categoriesWithVisibility grouped by row
    };

    // Group categoriesWithVisibility by row
    categoriesWithVisibility.forEach((category) => {
      // Handle favorite categories
      if (favoriteCategoryIds.has(category.id)) {
        groupedCategories.Favourite.push({
          id: category.id,
          name: category.name,
          description: category.description,
          categoryOrder: category.categoryOrder,
          fileUrl: fileMap[category.fileId] || null,
          categoryVisibility: category.categoryVisibility
        });
      } else {
        // Group by row
        const row = category.row || "Unspecified"; // Handle null rows
        if (!groupedCategories.rows[row]) {
          groupedCategories.rows[row] = []; // Initialize if not present
        }
        groupedCategories.rows[row].push({
          id: category.id,
          name: category.name,
          description: category.description,
          categoryOrder: category.categoryOrder,
          fileUrl: fileMap[category.fileId] || null,
          categoryVisibility: category.categoryVisibility
        });
      }
    });

    // Create the final response array
    const responseArray = [];

    // Add Favourite section if there are favorites
    if (groupedCategories.Favourite.length > 0) {
      responseArray.push({
        title: "Favourite",
        categories: groupedCategories.Favourite,
      });
    }

    // Add other categories grouped by row
    for (const [rowTitle, categoriesWithVisibility] of Object.entries(
      groupedCategories.rows
    )) {
      responseArray.push({
        title: rowTitle,
        categories: categoriesWithVisibility,
      });
    }

    res.status(200).json(responseArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
