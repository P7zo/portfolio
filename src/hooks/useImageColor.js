import { useEffect, useState } from 'react'

// Extracts a muted (low-saturation) accent color from an image so each project
// can be tinted by its own photos without loud, glowing colors.
export function useImageColor(src) {
  const [color, setColor] = useState(null) // { r, g, b }

  useEffect(() => {
    if (!src) return
    let cancelled = false

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      if (cancelled) return
      try {
        const size = 24
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0, size, size)
        const { data } = ctx.getImageData(0, 0, size, size)

        let r = 0, g = 0, b = 0, count = 0
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3]
          if (alpha < 125) continue
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
        if (!count) return
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)

        // Mute it: pull each channel toward its own luminance (desaturate ~45%).
        const lum = 0.299 * r + 0.587 * g + 0.114 * b
        const mix = 0.45
        r = Math.round(r * (1 - mix) + lum * mix)
        g = Math.round(g * (1 - mix) + lum * mix)
        b = Math.round(b * (1 - mix) + lum * mix)

        if (!cancelled) setColor({ r, g, b })
      } catch {
        /* tainted canvas or unsupported — fall back to neutral */
      }
    }

    return () => {
      cancelled = true
    }
  }, [src])

  return color
}

export function rgba(color, a = 1) {
  if (!color || color.r == null) return `rgba(140,140,140,${a})`
  return `rgba(${color.r},${color.g},${color.b},${a})`
}
