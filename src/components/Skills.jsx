import { useLang } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  const { t } = useLang()
  const { skills } = t

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal className="section__head">
          <span className="kicker">{skills.kicker}</span>
          <h2 className="section__title">{skills.title}</h2>
        </Reveal>

        <div className="skills__grid">
          {skills.items.map((s, i) => (
            <Reveal as="div" className="skill-chip" key={s} delay={i * 70}>
              <span className="skill-chip__bullet" />
              {s}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
