import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// Get all images
router.get("/", async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const [rows] = await pool.query("SELECT * FROM images");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;
