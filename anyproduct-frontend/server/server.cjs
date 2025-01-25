import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import fetch from "node-fetch";
import path from "path";
import App from "../src/App"; // Import directly from source

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets
app.use(express.static(path.join(__dirname, "dist")));

// API route for images
app.get("/api/images", async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await fetch(
      `https://internal.anyproduct.mkofman.people.aws.dev/api/images?page=${page}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching images:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SSR route
app.get("*", (req, res) => {
  const appHtml = renderToString(React.createElement(App));
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AnyProduct Gallery</title>
        <link rel="stylesheet" href="/assets/main-n_ryQ3BS.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/assets/main-BmS1U-6E.js"></script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
