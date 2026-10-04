import { CircleCheck } from 'lucide-react'
import { Reveal } from './Reveal'
import { ACCENTS, SERVICES } from '../data'

export function Services({ onSelectService }: { onSelectService: (service: string) => void }) {
  return (
    <section id="services" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <Reveal><h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Freelance Pricing &amp; Offers</h2></Reveal>
          <Reveal delay={0.08}>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Complete execution across Design, Development, Testing, and Deployment
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => {
            const a = ACCENTS[s.accent]
            const Icon = s.icon
            return (
              <Reveal key={s.title} from={s.side === 'left' ? 'left' : 'right'} delay={i * 0.12} className="card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 float-slow ${a.iconBox}`}
                    style={{ animationDelay: `${-2 * i}s` }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-100">{s.title}</h3>
                  <div className={`text-3xl sm:text-4xl font-extrabold my-4 font-display ${a.price}`}>
                    {s.price}{' '}
                    <span className="text-xs font-normal text-slate-400 font-sans">/ project</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{s.description}</p>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    {s.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <CircleCheck size={16} className={`mt-0.5 ${a.check}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  onClick={() => onSelectService(s.service)}
                  className={`block text-center py-3.5 rounded-xl border font-semibold transition-all duration-300 ${a.cta}`}
                >
                  {s.cta}
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
