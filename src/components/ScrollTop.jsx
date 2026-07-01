import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

// Back-to-top button. Fixed to the physical bottom-right regardless of dir.
export default function ScrollTop() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      className={`scroll-top ${show ? 'is-visible' : ''}`}
      onClick={toTop}
      aria-label={t.backToTop}
      title={t.backToTop}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
