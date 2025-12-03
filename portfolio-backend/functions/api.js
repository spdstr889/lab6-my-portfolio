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
    // Resolve projects.json robustly across Netlify dev/function bundle paths
    // __dirname in Netlify dev: <repo>/.netlify/functions-serve/api
    // We need to reach <repo>/portfolio-backend/projects.json
    // Deterministic path: resolve from workspace root to portfolio-backend/projects.json
    const preferredPath = path.resolve(process.cwd(), "portfolio-backend", "projects.json");
    const candidatePaths = [
      preferredPath,
      path.join(process.cwd(), "projects.json"),
      path.join(__dirname, "..", "projects.json"),
      path.join(__dirname, "projects.json")
    ];

    let filePath = candidatePaths.find(p => {
      try { return fs.existsSync(p); } catch { return false; }
    });

    console.log("Preferred projects.json path:", preferredPath);
    console.log("Candidate paths:", candidatePaths);
    console.log("Selected projects.json path:", filePath);

    if (!filePath) {
      console.warn("projects.json not found in candidate paths. Returning mock.");
      return res.status(200).json({
        projects: [
          {
            name: "Sample Project",
            author: "Portfolio",
            languages: ["React"],
            description: "Mock data because projects.json was not found."
          }
        ]
      });
    }

    const raw = fs.readFileSync(filePath, "utf8");
    console.log("Raw file content length:", raw?.length || 0);

    let projects;
    try {
      projects = JSON.parse(raw);
    } catch (parseErr) {
      console.error("Failed to parse projects.json:", parseErr);
      return res.status(200).json({
        projects: [
          {
            name: "Sample Project",
            author: "Portfolio",
            languages: ["React"],
            description: "Mock data because projects.json failed to parse."
          }
        ]
      });
    }

    return res.status(200).json({ projects });
  } catch (err) {
    console.error("Error reading projects:", err);
    return res.status(200).json({
      projects: [
        {
          name: "Sample Project",
          author: "Portfolio",
          languages: ["React"],
          description: "Mock data because an unexpected error occurred."
        }
      ]
    });
  }
});

// ----------------- /weather -----------------
router.get("/weather", async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        message: "Weather API key not configured"
      });
    }

    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=halifax,ca&units=metric&appid=${apiKey}`;
    const response = await fetch(weatherAPI);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenWeather API error:", response.status, errorText);
      
      // If API key not activated yet, return mock data
      if (response.status === 401) {
        console.log("API key not activated yet, returning mock data");
        return res.status(200).json({
          city: "Halifax",
          temperature: {
            current: 5.2
          },
          humidity: 78,
          note: "Using mock data - API key activation pending"
        });
      }
      
      return res.status(502).json({
        message: "Failed to fetch weather from OpenWeather.",
        error: errorText
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
