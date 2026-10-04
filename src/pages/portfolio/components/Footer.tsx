import { ArrowUp, Mail } from 'lucide-react'
import { useScrollPast } from '../../../hooks/useScrollPast'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { CONTACT } from '../data'

const YEAR = new Date().getFullYear()

const socialBtn =
  'w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:-translate-y-1'

export function Footer() {
  const showTop = useScrollPast(500)

  return (
    <>
      <footer className="relative z-10 border-t border-slate-900 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {YEAR} Surya S. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href={`mailto:${CONTACT.email}`} aria-label="Email" className={socialBtn}><Mail size={16} /></a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={socialBtn}><GithubIcon className="w-4 h-4" /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={socialBtn}><LinkedinIcon className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-cyan-500/40 bg-slate-900/80 backdrop-blur text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-500 hover:text-slate-950 ${
          showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  )
}
