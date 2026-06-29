import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <p className="hero__badge">👋 Available for new opportunities</p>

        <h1 className="hero__title">
          Hi, I'm <span className="hero__highlight">Your Name</span>
        </h1>

        <p className="hero__tagline">
          A frontend developer crafting clean, accessible, and responsive web
          experiences with React and modern JavaScript.
        </p>

        <div className="hero__actions">
          <a href="#projects" className="btn btn-primary">
            View Work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero__glow" aria-hidden="true" />
    </section>
  );
}
