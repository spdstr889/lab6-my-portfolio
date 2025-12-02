function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-3 text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} Rafin Ahmed
        </p>
        <p className="mb-0">
          <a
            href="mailto:your.email@example.com"
            className="link-light"
          >
            rf257766@dal.ca
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
