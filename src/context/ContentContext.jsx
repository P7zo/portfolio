import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { defaultData } from '../data/content.js'

const ContentContext = createContext(null)

// Provides site content. Starts with the bundled defaults so the page renders
// instantly, then swaps in the live data from the API once it loads.
export function ContentProvider({ children }) {
  const [data, setData] = useState(defaultData)

  const reload = useCallback(async () => {
    try {
      const res = await fetch('/api/content')
      if (!res.ok) return
      const json = await res.json()
      if (json && json.content && Array.isArray(json.projects)) setData(json)
    } catch {
      /* offline / API not ready — keep defaults */
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return (
    <ContentContext.Provider value={{ data, reload }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx
}
