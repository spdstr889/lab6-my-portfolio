import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

function WeatherWidget({ theme }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWeather() {
      try {
        const res = await fetch(`${API}/weather`);
        if (!res.ok) {
          throw new Error('Failed to fetch weather');
        }
        const data = await res.json();
        setWeather(data);
        setError(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setWeather(null);
        setError(true);
      }
      setLoading(false);
    }
    loadWeather();
  }, []);

  const cardClass =
    theme === "light" ? "card bg-white text-dark" : "card bg-secondary text-light";

  return (
    <div className={cardClass}>
      <div className="card-body">
        <h5>Current Weather</h5>
        {loading && <p>Loading...</p>}
        {!loading && error && (
          <p className="text-danger">Unable to load weather data. Make sure the API server is running.</p>
        )}
        {!loading && weather && (
          <>
            <p><strong>City:</strong> {weather.city}</p>
            <p><strong>Temperature:</strong> {weather.temperature.current}°C</p>
            <p><strong>Humidity:</strong> {weather.humidity}%</p>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;
