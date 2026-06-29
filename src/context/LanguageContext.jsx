import { createContext, useContext, useEffect, useState } from 'react'
import { content } from '../data/content.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'ar' ? saved : 'ar' // default: Arabic
  })

  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore storage errors */
    }
  }, [lang, t.dir])

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
