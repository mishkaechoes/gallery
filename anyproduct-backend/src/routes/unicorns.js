import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// Write a random unicorn message
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const pool = await connectToDatabase();
    const timestamp = new Date();
    await pool.query("INSERT INTO unicorns (name, timestamp) VALUES (?, ?)", [name, timestamp]);
    res.status(201).json({ message: "Unicorn added successfully" });
  } catch (error) {
    console.error("Error writing unicorn:", error);
    res.status(500).json({ error: "Failed to add unicorn" });
  }
});

// Read all unicorn messages
router.get("/", async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const [rows] = await pool.query("SELECT * FROM unicorns");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching unicorns:", error);
    res.status(500).json({ error: "Failed to fetch unicorns" });
  }
});

export default router;
