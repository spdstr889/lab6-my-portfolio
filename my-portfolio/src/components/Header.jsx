import { Link } from "react-router-dom";

function Header({ theme, toggleTheme }) {
  return (
    <nav className={`navbar navbar-expand-lg ${theme === "light" ? "navbar-light bg-white" : "navbar-dark bg-dark"} shadow-sm`}>
      <div className="container">
        <Link className="navbar-brand" to="/">My Portfolio</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
          </ul>

          <button className="btn btn-outline-primary btn-sm" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
