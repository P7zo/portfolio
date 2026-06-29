import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="container navbar__inner" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={close}>
          <span className="navbar__logo">YN</span>
          <span className="navbar__name">Your Name</span>
        </a>

        <ul className={`navbar__links ${open ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            className={`navbar__burger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && <div className="navbar__backdrop" onClick={close} />}
    </header>
  );
}
