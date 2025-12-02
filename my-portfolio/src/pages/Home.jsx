import WeatherWidget from "../components/WeatherWidget";

function Home({ theme }) {
  return (
    <section aria-labelledby="home-heading">
      <div className="row align-items-center">
        <div className="col-md-7">
          <h1 id="home-heading" className="display-4 fw-bold mb-3">
            Hello, this is Rafin Ahmed
          </h1>
          <p className="lead">
            I am an applied computer science student who enjoys building
            useful and user friendly web applications. This portfolio
            shows some of my work, skills, and goals.
          </p>
          <p>
            Use the navigation bar to learn more about my background and
            to explore some of my projects.
          </p>
        </div>
        <div className="col-md-5">
          <div
            className="card shadow-sm"
            aria-label="Short overview card"
          >
            <div className="card-body">
              <h2 className="h4 card-title">Quick facts</h2>
              <ul>
                <li>Student at Dalhousie University</li>
                <li>Interested in web development and data</li>
                <li>Comfortable with JavaScript, React, and Python</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-3">
            <WeatherWidget theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
