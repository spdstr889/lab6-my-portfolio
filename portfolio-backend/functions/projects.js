const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const filePath = path.join(__dirname, '..', 'projects.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(content);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load projects', message: err.message })
    };
  }
};
