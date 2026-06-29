import { useLang } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

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
        <Reveal as="p" className="about__body" delay={120}>
          {about.body}
        </Reveal>
      </div>
    </section>
  )
}
