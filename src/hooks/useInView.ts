import { useEffect, useRef, useState } from 'react'

/** Fires once when the element first scrolls into view. */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  // without IntersectionObserver support, just show the content
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, inView] as const
}
