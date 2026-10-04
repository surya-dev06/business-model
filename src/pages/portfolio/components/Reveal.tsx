import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../../hooks/useInView'

type Props = {
  children: ReactNode
  className?: string
  /** slide-in direction; default is a simple fade-up */
  from?: 'up' | 'left' | 'right' | 'scale'
  /** transition delay in seconds */
  delay?: number
}

const FROM_CLASS = { up: '', left: 'reveal-left', right: 'reveal-right', scale: 'reveal-scale' }

/** Scroll-reveal wrapper. Styles live in portfolio.css (.reveal / .in-view). */
export function Reveal({ children, className = '', from = 'up', delay = 0 }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const style = delay ? ({ '--d': `${delay}s` } as CSSProperties) : undefined
  return (
    <div
      ref={ref}
      style={style}
      className={`reveal ${FROM_CLASS[from]} ${inView ? 'in-view' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
