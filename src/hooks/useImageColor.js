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

        // Weight each pixel by its colorfulness so the image's real hue
        // surfaces instead of averaging out to a muddy gray.
        let r = 0, g = 0, b = 0, wSum = 0
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 125) continue
          const pr = data[i], pg = data[i + 1], pb = data[i + 2]
          const max = Math.max(pr, pg, pb)
          const min = Math.min(pr, pg, pb)
          const sat = max === 0 ? 0 : (max - min) / max
          const w = 0.15 + sat * sat * 3 // colorful pixels dominate
          r += pr * w
          g += pg * w
          b += pb * w
          wSum += w
        }
        if (!wSum) return
        r = Math.round(r / wSum)
        g = Math.round(g / wSum)
        b = Math.round(b / wSum)

        // Mute lightly so it stays elegant but is clearly visible.
        const lum = 0.299 * r + 0.587 * g + 0.114 * b
        const mix = 0.2
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
