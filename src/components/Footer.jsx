import { useLang } from '../context/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">{t.hero.name}</span>
        <span className="footer__copy">
          © {new Date().getFullYear()} — {t.footer}
        </span>
        <a className="footer__admin" href="/admin" aria-label="لوحة التحكم" title="لوحة التحكم">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V8a5 5 0 0 1 10 0v3" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
