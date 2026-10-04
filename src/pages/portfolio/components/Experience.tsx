import { ChevronRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { EXPERIENCE } from '../data'

export function Experience() {
  return (
    <section id="experience" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Reveal><h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Professional Experience</h2></Reveal>
        </div>

        <div className="relative pl-6 sm:pl-8">
          <div className="timeline-line absolute left-0 top-2 bottom-2 w-[3px] rounded-full" />

          <div className="space-y-6">
            {EXPERIENCE.map(job => (
              <Reveal key={job.role} from="right" className="card p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100">{job.role}</h3>
                    <p className="text-cyan-400 text-sm font-medium mt-1">{job.company}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 px-3 py-1.5 rounded-full border border-slate-700/70 bg-slate-900/60 self-start md:self-auto whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {job.points.map(p => (
                    <li key={p} className="flex gap-3">
                      <ChevronRight size={16} className="text-cyan-400 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
