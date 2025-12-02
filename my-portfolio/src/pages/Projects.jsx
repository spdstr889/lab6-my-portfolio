import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

function Projects({ theme }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch(`${API}/projects`);
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        const data = await res.json();
        const list = Array.isArray(data?.projects) ? data.projects : [];
        if (isMounted) setProjects(list);
        setError("");
      } catch (e) {
        setError("Unable to load projects.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const cardClass = theme === "light" ? "card bg-white text-dark" : "card bg-secondary text-light";

  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="mb-4">Projects</h1>
      <p className="mb-4">Projects are fetched from the backend.</p>

      {loading && <p>Loading...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}

      <div className="row gy-4">
        {projects.map((p) => (
          <div key={p.name} className="col-md-6">
            <article className={cardClass + " h-100 shadow-sm"}>
              <div className="card-body">
                <h2 className="h4 card-title">{p.name}</h2>
                <p className="text-muted mb-1"><strong>Author:</strong> {p.author}</p>
                <p className="mb-2">{p.description}</p>
                <p className="mb-0"><strong>Languages:</strong> {Array.isArray(p.languages) ? p.languages.join(", ") : String(p.languages || "")}</p>
              </div>
            </article>
          </div>
        ))}
        {!loading && !error && projects.length === 0 && (
          <div className="col-12"><p className="text-muted">No projects available.</p></div>
        )}
      </div>
    </section>
  );
}

export default Projects;
