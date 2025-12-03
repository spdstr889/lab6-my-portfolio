require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'WEATHER_API_KEY is not set' })
      };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=halifax,ca&units=metric&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: 'Upstream error', details: text })
      };
    }

    const data = await res.json();
    const payload = {
      city: data.name,
      temperature: { current: data.main && data.main.temp },
      humidity: data.main && data.main.humidity
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: err.message })
    };
  }
};
