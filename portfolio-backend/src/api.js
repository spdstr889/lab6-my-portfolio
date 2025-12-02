const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());

// ----------------- /projects -----------------
router.get("/projects", (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "projects.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(raw);

    return res.status(200).json({ projects });
  } catch (err) {
    console.error("Error reading projects:", err);
    return res.status(500).json({
      message: "Internal Server Error while reading projects."
    });
  }
});

// ----------------- /weather -----------------
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=halifax,ca&units=metric&appid=${process.env.WEATHER_API_KEY}`;

router.get("/weather", async (req, res) => {
  try {
    const response = await fetch(weatherAPI);

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch weather from OpenWeather."
      });
    }

    const data = await response.json();

    const weatherData = {
      city: data.name,
      temperature: {
        current: data.main.temp
      },
      humidity: data.main.humidity
    };

    return res.status(200).json(weatherData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

// ----------------- root + 404 -----------------
router.get("/", (req, res) => {
  res.json({ message: "Lab 6 backend root" });
});

router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Netlify handler
app.use("/.netlify/functions/api", router);

module.exports = app;
module.exports.handler = serverless(app);
