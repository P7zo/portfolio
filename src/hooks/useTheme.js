import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

// Light / dark theme, persisted. Default: dark.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}
