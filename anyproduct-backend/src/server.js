import express from "express";
import imagesRouter from "./routes/images.js";
import unicornsRouter from "./routes/unicorns.js";
import { initializeDatabase } from "./db.js"; // For Flyway-like migration

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(cors()); // Allow all origins

// Routes
app.use("/api/images", imagesRouter);
app.use("/api/unicorns", unicornsRouter);

// Health check
app.get("/", (req, res) => res.send("Backend is running!"));

// Initialize database tables and start the server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize the database:", err);
    process.exit(1);
  });
