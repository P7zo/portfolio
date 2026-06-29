import { useState } from "react";
import { SOCIALS } from "../data/content";
import "./Contact.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Placeholder: wire this up to your email service / API.
      setSubmitted(true);
      setValues({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Contact</span>
          <h2>Let's Work Together</h2>
          <p>
            Have a project in mind or just want to say hi? Drop me a message.
          </p>
        </div>

        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                placeholder="Jane Doe"
              />
              {errors.name && <span className="field__error">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <span className="field__error">{errors.email}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <span className="field__error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary contact__submit">
              Send Message
            </button>

            {submitted && (
              <p className="contact__success" role="status">
                ✓ Thanks! Your message has been validated (demo — no backend).
              </p>
            )}
          </form>

          <aside className="contact__aside">
            <h3>Find me online</h3>
            <p>Prefer another channel? Reach out through any of these.</p>
            <ul className="contact__socials">
              <li>
                <a href={SOCIALS.github} target="_blank" rel="noreferrer">
                  <span className="contact__social-icon">🐙</span> GitHub
                </a>
              </li>
              <li>
                <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
                  <span className="contact__social-icon">💼</span> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${SOCIALS.email}`}>
                  <span className="contact__social-icon">✉️</span>{" "}
                  {SOCIALS.email}
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
