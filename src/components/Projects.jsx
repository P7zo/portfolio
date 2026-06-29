import { PROJECTS } from "../data/content";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Projects</span>
          <h2>Things I've Built</h2>
          <p>A few sample projects with placeholder data — swap in your own.</p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__thumb" aria-hidden="true">
                {project.title.charAt(0)}
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <ul className="project-card__tags">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="project-card__links">
                <a
                  href={project.live}
                  className="project-card__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live ↗
                </a>
                <a
                  href={project.code}
                  className="project-card__link project-card__link--ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  Code ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
