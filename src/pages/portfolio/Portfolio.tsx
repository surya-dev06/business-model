import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Helmet } from 'react-helmet-async'
// import { AnimatedBackground } from '../../components/shared/AnimatedBackground'
import { ScrollProgress } from '../../components/shared/ScrollProgress'
import { useDocumentBackground } from '../../hooks/useDocumentBackground'
import { SERVICE_OPTIONS } from './data'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { SampleProject } from './components/SampleProject'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './portfolio.css'

const TITLE = 'Surya S | Full Stack & Mobile Application Developer'
const DESCRIPTION =
  'Surya S – Full Stack & Mobile Application Developer. React, Node.js, Spring Boot, Flutter, AWS. Freelance web & mobile app development.'

export default function Portfolio() {
  const [service, setService] = useState(SERVICE_OPTIONS[0])
  // useDocumentBackground('#020617')/
  useDocumentBackground('#0b1020')

  // mouse-follow spotlight on any .card (uses event delegation)
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.card')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="pf-root" onMouseMove={onMouseMove}>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        {/* <meta name="theme-color" content="#020617" /> */}
        <meta name="theme-color" content="#0b1020" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://suryadevs.in/" />
      </Helmet>

      {/* <AnimatedBackground variant="portfolio" /> */}
      <ScrollProgress variant="portfolio" />
      <Navbar />

      <main>
        <Hero />
        <Services onSelectService={setService} />
        <Skills />
        <Experience />
        <Projects />
        <SampleProject />
        <Contact service={service} onServiceChange={setService} />
      </main>

      <Footer />
    </div>
  )
}
