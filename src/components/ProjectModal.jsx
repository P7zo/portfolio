import { useEffect } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { useImageColor, rgba } from '../hooks/useImageColor.js'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useLang()
  const pt = project[lang]
  const color = useImageColor(project.images[0])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const style = {
    '--pc-accent': rgba(color, 1),
    '--pc-tint': rgba(color, 0.32),
    '--pc-tint-soft': rgba(color, 0.1),
    '--pc-border': rgba(color, 0.6),
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={pt.client} onClick={onClose}>
      <div className="modal__panel" style={style} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label={t.experience.closeLabel}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <header className="modal__head">
          <span className="modal__logo">
            <img src={project.logo} alt="" />
          </span>
          <div>
            <h3 className="modal__client">{pt.client}</h3>
            <p className="modal__role">
              <span className="modal__role-label">{t.experience.roleLabel}:</span> {pt.role}
            </p>
          </div>
        </header>

        <section className="modal__section">
          <h4 className="modal__subtitle">{t.experience.whatWeDidLabel}</h4>
          <ul className="modal__list">
            {pt.whatWeDid.map((item) => (
              <li key={item}>
                <span className="modal__check"><CheckIcon /></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="modal__section">
          <h4 className="modal__subtitle">{t.experience.galleryLabel}</h4>
          <div className="modal__gallery">
            {project.images.map((src, i) => (
              <a className="modal__shot" href={src} target="_blank" rel="noreferrer" key={src}>
                <img src={src} alt={`${pt.client} — ${i + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
