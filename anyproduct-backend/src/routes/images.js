import express from "express";
import { connectToDatabase } from "../db.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

// S3 Configuration
const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "anycompany-unicorns";

// Generate Pre-Signed URL
const generatePresignedUrl = async (key) => {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 }); // 1-hour expiry
};

// Get paginated images with pre-signed URLs
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; // Number of images per page
  const offset = (page - 1) * limit;

  try {
    const pool = await connectToDatabase();
    const [rows] = await pool.query(
      "SELECT * FROM images ORDER BY id LIMIT ? OFFSET ?",
      [limit, offset]
    );

    if (rows.length === 0) {
      return res.json([]); // Return empty if no results
    }

    // Add pre-signed URLs
    const images = await Promise.all(
      rows.map(async (image) => {
        const presignedUrl = await generatePresignedUrl(image.name); // Use file name as the key
        return { ...image, presignedUrl };
      })
    );

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;
