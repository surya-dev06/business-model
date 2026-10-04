import { useEffect } from 'react'

/** Paints <html> so overscroll / rubber-banding matches the current page. */
export function useDocumentBackground(color: string) {
  useEffect(() => {
    const el = document.documentElement
    const previous = el.style.backgroundColor
    el.style.backgroundColor = color
    return () => { el.style.backgroundColor = previous }
  }, [color])
}
