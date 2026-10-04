import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollPast } from '../../../hooks/useScrollPast'
import { NAV_LINKS } from '../data'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollPast(30)

  // close the mobile menu when the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => { if (mq.matches) setOpen(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <nav className={`nav-shell fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="#hero" className="text-xl sm:text-2xl font-extrabold tracking-wider gradient-text font-display">
            SURYA
          </a>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link hover:text-cyan-400">{l.label}</a>
            ))}
            <a href="#contact" className="btn-primary px-5 py-2.5 rounded-full text-sm">Hire Me</a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="lg:hidden w-11 h-11 rounded-xl border border-slate-700/80 bg-slate-900/60 flex items-center justify-center text-slate-200 active:scale-95 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        inert={!open}
        className={`lg:hidden grid transition-[grid-template-rows] duration-500 ease-in-out bg-slate-950/95 backdrop-blur-xl ${
          open ? 'grid-rows-[1fr] border-t border-slate-800/70' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-5 flex flex-col gap-1 text-slate-300">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-lg hover:bg-slate-800/60 hover:text-cyan-400 transition"
              >
                {l.mobile}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center btn-primary py-3.5 rounded-xl"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
