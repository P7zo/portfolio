import { useLang } from '../context/LanguageContext.jsx'
import { useContent } from '../context/ContentContext.jsx'

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export default function Hero() {
  const { t } = useLang()
  const { data } = useContent()
  const heroImage = data.heroImage
  const { hero } = t

  return (
    <section id="home" className="hero">
      <div className="hero__grid">
        <div className="hero__text">
          <p className="hero__location">
            <PinIcon /> {hero.location}
          </p>
          <p className="hero__greeting">{hero.greeting}</p>
          <h1 className="hero__name">{hero.name}</h1>
          <p className="hero__title">{hero.title}</p>
          <p className="hero__bio">{hero.bio}</p>
          <div className="hero__cta">
            <a href="#experience" className="btn btn--solid">{hero.ctaProjects}</a>
            <a href="#contact" className="btn btn--outline">{hero.ctaContact}</a>
          </div>
        </div>

        <div className="hero__photo">
          <img src={heroImage} alt={hero.name} loading="eager" />
        </div>
      </div>
    </section>
  )
}
