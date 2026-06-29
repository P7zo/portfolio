import { SOCIALS } from "../data/content";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} Your Name. All rights reserved.
        </p>
        <div className="footer__links">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${SOCIALS.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
