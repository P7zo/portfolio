import { useLang } from '../context/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLang()
  const { hero } = t

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__location">
          <span className="dot" /> {hero.location}
        </p>
        <h1 className="hero__name">{hero.name}</h1>
        <p className="hero__title">{hero.title}</p>
        <p className="hero__bio">{hero.bio}</p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">
            {hero.ctaProjects}
          </a>
          <a href="#contact" className="btn btn--ghost">
            {hero.ctaContact}
          </a>
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}
