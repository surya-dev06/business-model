import { Reveal } from './Reveal'
import { SKILLS } from '../data'

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal><h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Technical Skills</h2></Reveal>
          <Reveal delay={0.08}><p className="text-slate-400 mt-2 text-sm">Core technologies used in production applications</p></Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SKILLS.map((skill, i) => (
            <Reveal
              key={skill}
              from="scale"
              delay={0.02 + i * 0.02}
              className="chip card card-static p-4 rounded-xl text-center font-mono text-xs sm:text-sm text-slate-200"
            >
              {skill}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
