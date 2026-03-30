import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { API_URL } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, ".env"),
  quiet: true,
});

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server works");
});

app.get("/quiz", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
