import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import fetch from "node-fetch";
import path from "path";
import App from "./App";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the dist directory
app.use(express.static(path.join(__dirname, "../dist")));

// Handle the API route on the server
app.get("/api/images", async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await fetch(`https://internal.anyproduct.mkofman.people.aws.dev/api/images?page=${page}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle SSR for React
app.get("*", (req, res) => {
  const appHtml = renderToString(React.createElement(App));
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/assets/unicorn-BCQR-Tm2.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AnyProduct: Best Unicorns</title>
        <link rel="stylesheet" href="/assets/index.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/assets/index.js"></script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));