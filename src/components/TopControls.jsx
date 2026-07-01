import { useLang } from '../context/LanguageContext.jsx'
import { useTheme } from '../hooks/useTheme.js'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

// Language + theme toggles. Positioned at the logical start (flips with dir).
export default function TopControls() {
  const { t, lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="top-controls">
      <button
        type="button"
        className="ctl-btn"
        onClick={toggleLang}
        aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        title={lang === 'ar' ? 'English' : 'العربية'}
      >
        {t.langLabel}
      </button>
      <button
        type="button"
        className="ctl-btn ctl-btn--icon"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t.themeLabelToLight : t.themeLabelToDark}
        title={theme === 'dark' ? t.themeLabelToLight : t.themeLabelToDark}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}
