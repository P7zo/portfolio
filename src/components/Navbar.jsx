import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

const SECTIONS = ['home', 'about', 'projects', 'skills', 'contact']

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={close}>
          <span className="navbar__mark">AM</span>
          <span className="navbar__name">{t.hero.name}</span>
        </a>

        <ul className={`navbar__links ${open ? 'is-open' : ''}`}>
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={close}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            {t.langLabel}
          </button>
          <button
            type="button"
            className={`navbar__burger ${open ? 'is-open' : ''}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}
