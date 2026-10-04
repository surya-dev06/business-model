import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, ExternalLink, MousePointerClick } from 'lucide-react'
import { Reveal } from './Reveal'
import { SAMPLE_PROJECT as P } from '../data'

export function SampleProject() {
  return (
    <section id="sample-project" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] font-mono uppercase tracking-widest mb-4">
              <span className="pulse-dot" /> Live Sample Website
            </div>
          </Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Sample Project</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              See exactly what you get — open the full demo website I built for businesses
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* ---- Browser preview (click opens the demo) ---- */}
          <Reveal from="left">
            <Link to={P.route} aria-label={`Open ${P.name} demo`} className="block group">
              <div className="demo-frame">
                <div className="flex items-center gap-1.5 h-10 px-4 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="mx-auto text-[11px] font-mono text-slate-500">suryadevs.in{P.route}</span>
                </div>
                <div className="demo-art p-6 sm:p-9 aspect-[1.28]">
                  <div className="text-[10px] tracking-[.2em] font-semibold" style={{ color: '#9cff57' }}>YOUR BRAND</div>
                  <div className="font-display text-2xl sm:text-4xl font-bold leading-none mt-3">
                    Launch a website<br /><span style={{ color: '#8f73ff' }}>people remember.</span>
                  </div>
                  <div className="demo-bar w-1/2 mt-5" />
                  <div className="demo-bar w-1/3 mt-2.5" />
                  <div className="grid grid-cols-3 gap-2.5 mt-7 sm:mt-9">
                    <i className="demo-tile h-14 sm:h-20 block float-slow" />
                    <i className="demo-tile h-14 sm:h-20 block float-slow" style={{ animationDelay: '-2s' }} />
                    <i className="demo-tile h-14 sm:h-20 block float-slow" style={{ animationDelay: '-4s' }} />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 border border-purple-400/40 text-xs text-purple-200 backdrop-blur">
                    <MousePointerClick size={14} /> Click to open live demo
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ---- Details ---- */}
          <Reveal from="right" delay={0.1}>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">{P.name}</h3>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">{P.summary}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {P.stack.map(t => (
                <span key={t} className="chip text-[11px] font-mono px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 text-slate-300">
                  {t}
                </span>
              ))}
            </div>

            <ul className="space-y-3 text-sm text-slate-300 mt-7">
              {P.highlights.map(h => (
                <li key={h} className="flex items-start gap-3">
                  <CircleCheck size={16} className="text-purple-400 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Link to={P.route} className="btn-primary px-7 py-3.5 rounded-full text-sm sm:text-base text-center inline-flex items-center justify-center gap-2">
                View Live Demo <ArrowRight size={18} />
              </Link>
              <a
                href={P.route}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost px-7 py-3.5 rounded-full text-slate-200 font-semibold text-sm sm:text-base text-center inline-flex items-center justify-center gap-2"
              >
                Open in New Tab <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
