import { useLang } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Projects() {
  const { t } = useLang()
  const { projects } = t

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="section__head">
          <span className="kicker">{projects.kicker}</span>
          <h2 className="section__title">{projects.title}</h2>
        </Reveal>

        <div className="projects__grid">
          {projects.items.map((p, i) => (
            <Reveal as="article" className="project-card" key={p.client} delay={i * 100}>
              <div className="project-card__num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="project-card__client">{p.client}</h3>
              <p className="project-card__role">
                <span className="project-card__role-label">{projects.roleLabel}:</span> {p.role}
              </p>
              <ul className="project-card__bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
