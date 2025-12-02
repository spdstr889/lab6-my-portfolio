import Skills from "../components/Skills";

function About({ theme }) {
  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading" className="mb-4">
        About Me
      </h1>

      <div className="row gy-4">
        <div className="col-md-6">
          <h2 className="h4">Education</h2>
          <p>
            I am studying Applied Computer Science at Dalhousie University.
            My coursework covers web development, databases, information
            retrieval, and software engineering.
          </p>

          <h2 className="h4 mt-4">Career goals</h2>
          <p>
            My goal is to work as a software developer where I can design
            and build user focused applications. I am especially interested
            in roles that involve both front end and back end development.
          </p>
        </div>

        <div className="col-md-6">
          <h2 className="h4">Technical skills</h2>
          <p className="text-muted">Search and filter by category.</p>
          <Skills theme={theme} />
        </div>
      </div>
    </section>
  );
}

export default About;
