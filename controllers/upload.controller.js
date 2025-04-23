import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

// Initialize Prisma Client
const prisma = new PrismaClient();

// Upload file to S3 and store in database
export const uploadFile = async (req, res) => {
  const dest = req.params.dest; // Get the folder name from the route parameter

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${dest}/${Date.now()}-${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct the file URL
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    // Store file information in the database
    const newFile = await prisma.file.create({
      data: {
        fileUrl: fileUrl,
        bytes: req.file.size, // Store the file size
        userId: req.user.id, // Assuming you have userId from the request context
        status: "uploaded", // Set the status as needed
      },
    });

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: fileUrl,
      fileId: newFile.id, // Return the new file ID
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
};
