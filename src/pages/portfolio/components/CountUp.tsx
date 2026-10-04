import { useEffect, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

type Props = { to: number; decimals?: number; suffix?: string; duration?: number; className?: string }

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, decimals = 0, suffix = '', duration = 1500, className }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [value, setValue] = useState(0)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(to * (1 - Math.pow(1 - p, 3))) // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to, duration])

  return <div ref={ref} className={className}>{(reduce && inView ? to : value).toFixed(decimals)}{suffix}</div>
}
