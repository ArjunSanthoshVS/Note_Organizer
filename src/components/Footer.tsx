import "./Footer.css"
const Footer = () => {
  return (
    <div className="row footer p-4">
      <div className="col text-end">
        <a
          href="https://www.linkedin.com/in/arjun-santhosh-94a663220/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="col text-start">
        <a 
          href="https://github.com/ArjunSanthoshVS"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
      </div>
    </div>
  );
}

export default Footer
