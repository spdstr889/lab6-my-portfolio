const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  try {
    // Netlify functions run with the working directory set to /var/task
    const filePath = path.join(process.cwd(), "projects.json");

    const content = fs.readFileSync(filePath, "utf-8");
    const projects = JSON.parse(content);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects })
    };
  } catch (err) {
    console.error("Error loading projects:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to load projects",
        message: err.message
      })
    };
  }
};
