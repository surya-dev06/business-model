import { useEffect, useRef } from 'react'
import type { BackgroundVariant } from './AnimatedBackground'
import './ScrollProgress.css'

/** Thin gradient bar at the top of the page showing scroll progress. */
export function ScrollProgress({ variant = 'portfolio' }: { variant?: BackgroundVariant }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={barRef} className={`sp-bar sp-${variant}`} aria-hidden="true" />
}
