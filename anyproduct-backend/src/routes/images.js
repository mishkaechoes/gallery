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
  
      // If no results, return empty array
      if (rows.length === 0) {
        return res.json([]);
      }
  
      res.json(rows);
    } catch (error) {
      console.error("Error fetching paginated images:", error);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });
  