import { useLang } from '../context/LanguageContext.jsx'
import { useImageColor, rgba } from '../hooks/useImageColor.js'
import Reveal from './Reveal.jsx'

export default function ProjectCard({ project, index, onOpen }) {
  const { t, lang } = useLang()
  const pt = project[lang]
  const color = useImageColor(project.images[0])

  const style = {
    '--pc-accent': rgba(color, 1),
    '--pc-tint': rgba(color, 0.14),
    '--pc-tint-soft': rgba(color, 0.06),
    '--pc-border': rgba(color, 0.35),
  }

  return (
    <Reveal
      as="article"
      className="pc"
      delay={index * 110}
      style={style}
      onClick={() => onOpen(project.id)}
    >
      <span className="pc__logo">
        <img src={project.logo} alt="" loading="lazy" />
      </span>

      <a
        className="pc__name"
        href={`#project-${project.id}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {pt.client}
      </a>

      <p className="pc__role">{pt.role}</p>
      <p className="pc__summary">{pt.summary}</p>

      <span className="pc__more">
        {t.experience.moreLabel}
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pc__more-arrow">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Reveal>
  )
}
