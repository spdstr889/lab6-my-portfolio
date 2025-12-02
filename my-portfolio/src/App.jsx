import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const THEME_KEY = "lab6-theme";

  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  // Save theme when it changes
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme === "light" ? "bg-light text-dark min-vh-100" : "bg-dark text-light min-vh-100"}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
