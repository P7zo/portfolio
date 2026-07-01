import { useLang } from '../context/LanguageContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import Reveal from './Reveal.jsx'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.4 8.4h4.2V24H.4V8.4Zm7.5 0h4v2.1h.06c.56-1 1.9-2.1 3.9-2.1 4.2 0 5 2.7 5 6.3V24h-4.2v-6.9c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V24h-4.2V8.4Z" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  )
}

export default function Contact() {
  const { t, lang } = useLang()
  const { data } = useContent()
  const contactInfo = data.contactInfo
  const extraMethods = contactInfo.extraMethods || []
  const { contact } = t

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="section__head">
          <span className="kicker">{contact.kicker}</span>
          <h2 className="section__title">{contact.title}</h2>
          <p className="contact__body">{contact.body}</p>
        </Reveal>

        <Reveal className="contact__cards" delay={120}>
          <a className="contact-card" href={`mailto:${contactInfo.email}`}>
            <span className="contact-card__icon"><MailIcon /></span>
            <span className="contact-card__label">{contact.emailLabel}</span>
            <span className="contact-card__value" dir="ltr">{contactInfo.email}</span>
          </a>
          <a className="contact-card" href={`tel:${contactInfo.phone}`}>
            <span className="contact-card__icon"><PhoneIcon /></span>
            <span className="contact-card__label">{contact.phoneLabel}</span>
            <span className="contact-card__value" dir="ltr">{contactInfo.phone}</span>
          </a>
          <a className="contact-card" href={contactInfo.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-card__icon"><LinkedInIcon /></span>
            <span className="contact-card__label">{contact.linkedinLabel}</span>
            <span className="contact-card__value">awadh-almutairi</span>
          </a>

          {extraMethods.map((m) => {
            const label = (lang === 'ar' ? m.labelAr : m.labelEn) || m.labelAr || m.labelEn || ''
            const href = m.href || m.value || '#'
            return (
              <a
                className="contact-card"
                href={href}
                target={/^https?:/i.test(href) ? '_blank' : undefined}
                rel="noreferrer"
                key={m.id}
              >
                <span className="contact-card__icon"><LinkIcon /></span>
                <span className="contact-card__label">{label}</span>
                <span className="contact-card__value" dir="ltr">{m.value}</span>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
