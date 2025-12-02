import { useMemo, useState } from "react";

const ALL_SKILLS = [
  // Languages
  { name: "JavaScript", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Language" },

  // Web stack
  { name: "HTML5", category: "Web" },
  { name: "CSS3", category: "Web" },
  { name: "React", category: "Web" },
  { name: "Node", category: "Web" },
  { name: "Bootstrap", category: "Web" },

  // Tools
  { name: "Git", category: "Tool" },
  { name: "GitLab", category: "Tool" },
  { name: "GitHub", category: "Tool" },
  { name: "VS Code", category: "Tool" },

  // Other
  { name: "Agile", category: "Other" },
  { name: "Basic Testing", category: "Other" }
];

const CATEGORIES = ["All", "Web", "Language", "Tool", "Other"];

function Skills({ theme }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_SKILLS.filter((s) => {
      const matchesText = q === "" || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      return matchesText && matchesCategory;
    });
  }, [query, activeCategory]);

  const cardClass = theme === "light" ? "card bg-white text-dark" : "card bg-secondary text-light";

  return (
    <div className={cardClass}>
      <div className="card-body">
        <h2 className="h4 mb-3">Interactive Skills</h2>

        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search skills or categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search skills"
            />
          </div>
          <div className="col-md-6 d-flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${activeCategory === cat ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-3">
          {filtered.map((s) => (
            <div key={`${s.name}-${s.category}`} className="col-6 col-md-4 col-lg-3">
              <div className="border rounded p-2 h-100">
                <div className="fw-semibold">{s.name}</div>
                <div className="text-muted small">{s.category}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-12">
              <p className="text-muted mb-0">No skills match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skills;
