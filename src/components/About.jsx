import { useLang } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4.5" />
    </svg>
  )
}

export default function About() {
  const { t } = useLang()
  const { about } = t

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal className="section__head">
          <span className="kicker">{about.kicker}</span>
          <h2 className="section__title">{about.title}</h2>
        </Reveal>

        <Reveal as="p" className="about__body" delay={100}>
          {about.body}
        </Reveal>

        <Reveal className="edu-card" delay={180}>
          <span className="edu-card__icon"><CapIcon /></span>
          <div>
            <span className="edu-card__label">{about.educationLabel}</span>
            <p className="edu-card__degree">{about.education}</p>
            <p className="edu-card__uni">{about.university}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
