import { useEffect, useState } from 'react'

/** true once the page has been scrolled more than `threshold` px */
export function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    let ticking = false
    const update = () => { setPast(window.scrollY > threshold); ticking = false }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return past
}
