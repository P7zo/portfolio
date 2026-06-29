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
      </div>
    </footer>
  )
}
