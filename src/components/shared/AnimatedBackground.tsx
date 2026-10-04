import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, RefObject } from 'react'
import './AnimatedBackground.css'

export type BackgroundVariant = 'portfolio' | 'business'

/** "r,g,b" triplets — kept in sync with the --c1..--c4 CSS variables */
const PALETTES: Record<BackgroundVariant, string[]> = {
  portfolio: ['34,211,238', '99,102,241', '168,85,247', '52,211,153'],
  business: ['124,77,255', '72,229,255', '156,255,87', '255,96,201'],
}

type Particle = { id: number; style: CSSProperties }

function makeParticles(palette: string[]): Particle[] {
  const count = window.innerWidth < 768 ? 14 : 30
  return Array.from({ length: count }, (_, id) => {
    const size = (Math.random() * 2.4 + 1.4).toFixed(1)
    const rgb = palette[Math.floor(Math.random() * palette.length)]
    return {
      id,
      style: {
        left: `${Math.random() * 100}%`,
        bottom: '-10px',
        width: `${size}px`,
        height: `${size}px`,
        background: `rgba(${rgb},.8)`,
        boxShadow: `0 0 8px rgba(${rgb},.9)`,
        animationDuration: `${(Math.random() * 18 + 16).toFixed(1)}s`,
        animationDelay: `-${(Math.random() * 22).toFixed(1)}s`,
      },
    }
  })
}

type Node = { x: number; y: number; vx: number; vy: number; r: number; rgb: string }

/** Lightweight "constellation" canvas: drifting dots that link up and react to the pointer. */
function useConstellation(canvasRef: RefObject<HTMLCanvasElement | null>, palette: string[]) {
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999 }
    let w = 0, h = 0, raf = 0
    let nodes: Node[] = []

    const spawn = (): Node => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.8,
      rgb: palette[Math.floor(Math.random() * palette.length)],
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = w < 768 ? 26 : Math.min(70, Math.round((w * h) / 24000))
      while (nodes.length < target) nodes.push(spawn())
      if (nodes.length > target) nodes = nodes.slice(0, target)
      nodes.forEach(n => { n.x = Math.min(n.x, w); n.y = Math.min(n.y, h) })
      if (reduceMotion) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const link = w < 768 ? 100 : 135
      const pointerRange = 170

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < link) {
            ctx.strokeStyle = `rgba(${a.rgb},${(1 - d / link) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y)
        if (pd < pointerRange) {
          ctx.strokeStyle = `rgba(${a.rgb},${(1 - pd / pointerRange) * 0.45})`
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke()
        }
        ctx.fillStyle = `rgba(${a.rgb},.85)`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        const pdx = n.x - pointer.x, pdy = n.y - pointer.y
        const pd = Math.hypot(pdx, pdy)
        if (pd < 120 && pd > 0) {           // gentle push away from the pointer
          n.x += (pdx / pd) * 0.6
          n.y += (pdy / pd) * 0.6
        }
        n.x += n.vx; n.y += n.vy
        if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const start = () => { if (!reduceMotion && !raf) raf = requestAnimationFrame(step) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    const onMove = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY }
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999 }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onLeave, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onLeave)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [canvasRef, palette])
}

export function AnimatedBackground({ variant = 'portfolio' }: { variant?: BackgroundVariant }) {
  const palette = PALETTES[variant]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles] = useState(() => makeParticles(palette))

  useConstellation(canvasRef, palette)

  return (
    <div className={`ab-stage ab-${variant}`} aria-hidden="true">
      <div className="ab-orb ab-orb-1" />
      <div className="ab-orb ab-orb-2" />
      <div className="ab-orb ab-orb-3" />
      <div className="ab-orb ab-orb-4" />
      <div className="ab-grid" />
      <canvas ref={canvasRef} className="ab-canvas" />
      <div className="ab-particles">
        {particles.map(p => <span key={p.id} className="ab-particle" style={p.style} />)}
      </div>
      <div className="ab-vignette" />
    </div>
  )
}
