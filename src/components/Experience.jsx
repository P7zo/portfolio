import { useCallback, useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { projects } from '../data/content.js'
import Reveal from './Reveal.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'

const visibleProjects = projects.filter((p) => !p.hidden)

function idFromHash() {
  const m = /^#project-(.+)$/.exec(window.location.hash)
  if (!m) return null
  const id = m[1]
  return visibleProjects.some((p) => p.id === id) ? id : null
}

export default function Experience() {
  const { t } = useLang()
  const [activeId, setActiveId] = useState(null)

  // Open the matching project when the URL points at one (deep link / back-fwd).
  useEffect(() => {
    const sync = () => setActiveId(idFromHash())
    sync()
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((id) => {
    if (window.location.hash !== `#project-${id}`) {
      window.history.pushState(null, '', `#project-${id}`)
    }
    setActiveId(id)
  }, [])

  const close = useCallback(() => {
    setActiveId(null)
    if (/^#project-/.test(window.location.hash)) {
      window.history.pushState(null, '', '#experience')
    }
  }, [])

  const active = visibleProjects.find((p) => p.id === activeId) || null

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal className="section__head">
          <span className="kicker">{t.experience.kicker}</span>
          <h2 className="section__title">{t.experience.title}</h2>
        </Reveal>

        <Reveal className="employer" delay={80}>
          <span className="employer__icon">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
            </svg>
          </span>
          <span className="employer__role">{t.experience.currentRole}</span>
          <span className="employer__sep">·</span>
          <span className="employer__company">{t.experience.currentCompany}</span>
        </Reveal>

        <Reveal as="p" className="experience__intro" delay={140}>
          {t.experience.intro}
        </Reveal>

        <div className="pc-grid">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}
