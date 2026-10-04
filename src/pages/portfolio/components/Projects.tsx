import { Reveal } from './Reveal'
import { PROJECTS } from '../data'

export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <Reveal><h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Featured Work</h2></Reveal>
          <Reveal delay={0.08}>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Projects delivered with high availability and optimized performance
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal
                key={p.title}
                delay={0.04 + i * 0.08}
                className={`card p-6 sm:p-7 flex flex-col ${p.wide ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`${p.color} mb-4 float-slow`} style={{ animationDelay: `${-1.5 * i}s` }}>
                  <Icon size={32} />
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold mb-2 text-slate-100">{p.title}</h4>
                <p className="text-[11px] font-mono text-slate-400 mb-4 leading-relaxed">{p.stack}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
