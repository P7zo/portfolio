import { useContent } from '../context/ContentContext.jsx'

// Injects the admin-editable theme colors as CSS variables, overriding the
// defaults in index.css. Works for both light and dark modes.
export default function ThemeStyle() {
  const { data } = useContent()
  const th = data.theme
  if (!th) return null

  const css = `
:root{ --accent:${th.accent}; }
[data-theme="dark"]{ --bg:${th.dark.bg}; --bg-card:${th.dark.card}; --text:${th.dark.text}; }
[data-theme="light"]{ --bg:${th.light.bg}; --bg-card:${th.light.card}; --text:${th.light.text}; }
`
  return <style>{css}</style>
}
