import { Rocket } from 'lucide-react'
import { Reveal } from './Reveal'
import { CountUp } from './CountUp'
import { STATS } from '../data'

export function Hero() {
  return (
    <section id="hero" className="relative z-10 pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <Reveal className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-7">
          <span className="pulse-dot" />
          Open for Freelance Projects
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display text-[2.1rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl">
            Full Stack Web &amp; Mobile{' '}
            <span className="gradient-text">Applications Built to Scale.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
            I'm <strong className="text-slate-200 font-semibold">Surya S</strong>, a Full Stack Developer with{' '}
            <strong className="text-cyan-400 font-semibold">1.5+ years</strong> of experience building microservices,
            real-time architectures, web platforms, and Flutter mobile applications.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-9 flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto">
          <a href="#contact" className="btn-primary px-8 py-4 rounded-full text-base text-center inline-flex items-center justify-center gap-2">
            <Rocket size={18} /> Start a Project
          </a>
          <a href="#services" className="btn-ghost px-8 py-4 rounded-full text-slate-200 font-semibold text-base text-center">
            View Pricing Offers
          </a>
        </Reveal>

        <Reveal delay={0.32} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 w-full max-w-4xl">
          {STATS.map(s => (
            <div key={s.label} className="card card-static p-4 sm:p-5 text-center">
              <CountUp
                to={s.to}
                decimals={s.decimals}
                suffix={s.suffix}
                className="text-2xl sm:text-3xl font-extrabold gradient-text font-display"
              />
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
