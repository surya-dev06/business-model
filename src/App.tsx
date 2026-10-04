import { useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Reveal } from './components/Reveal'
import { ContactForm } from './components/ContactForm'
import { iconMap } from './components/Icons'
import { services, projects, testimonials } from './data/site'
import './styles.css'

function Home() {
  useEffect(() => { document.documentElement.style.scrollBehavior = 'smooth'; return () => { document.documentElement.style.scrollBehavior = 'auto' } }, [])
  const wa = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}?text=Hi%20NexaFlow%2C%20I%20want%20to%20discuss%20a%20website%20project.`
  return <div className="site">
    <Helmet>
      <title>NexaFlow — Modern Websites for Growing Businesses</title>
      <meta name="description" content="React + TypeScript websites for restaurants, agencies, small businesses, consultants and startups." />
      <meta property="og:title" content="NexaFlow — Modern Websites for Growing Businesses" />
      <meta property="og:description" content="Premium responsive websites, backend integrations, SEO and Cloudflare deployment." />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://suryadevs.in/bussiness_model" />
    </Helmet>
    <Navbar />
    <main>
      <section id="home" className="hero section">
        <div className="hero-copy">
          <Reveal><span className="eyebrow"><span className="pulse-dot"/> DIGITAL STUDIO FOR GROWING BRANDS</span></Reveal>
          <Reveal delay={.08}><h1>Websites that make your <span>business</span> look bigger.</h1></Reveal>
          <Reveal delay={.16}><p>High-impact React websites for restaurants, agencies, consultants, small businesses and startups — designed to build trust and turn visitors into enquiries.</p></Reveal>
          <Reveal delay={.24}><div className="hero-actions"><a className="btn primary" href="#contact">Build My Website <iconMap.ArrowRight/></a><a className="btn ghost" href={wa} target="_blank" rel="noreferrer"><iconMap.MessageCircle/> Chat on WhatsApp</a></div></Reveal>
          <Reveal delay={.32}><div className="mini-points"><span><iconMap.CheckCircle2/> Mobile-first</span><span><iconMap.CheckCircle2/> SEO-ready</span><span><iconMap.CheckCircle2/> Cloudflare deployed</span></div></Reveal>
        </div>
        <Reveal delay={.15} className="hero-visual">
          <div className="orb orb-a"/><div className="orb orb-b"/>
          <motion.div className="browser-card" animate={{ y:[0,-10,0], rotateX:[0,1.5,0], rotateY:[0,-1,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}>
            <div className="browser-top"><span/><span/><span/><small>nexaflow.studio</small></div>
            <div className="mock-content"><div className="mock-label">YOUR BRAND</div><div className="mock-title">Launch a website<br/><b>people remember.</b></div><div className="mock-line"/><div className="mock-cards"><i/><i/><i/></div></div>
          </motion.div>
          <motion.div className="float-card card-one" animate={{ y:[0,-14,0] }} transition={{ duration:4, repeat:Infinity }}><iconMap.Zap/><b>Fast & SEO-ready</b><small>Built for Core Web Vitals</small></motion.div>
          <motion.div className="float-card card-two" animate={{ y:[0,12,0] }} transition={{ duration:5, repeat:Infinity }}><iconMap.HeartHandshake/><b>More enquiries</b><small>Clear CTAs + WhatsApp</small></motion.div>
        </Reveal>
      </section>

      <section className="stats section">
        {[['50+', 'UI sections built'], ['4×', 'device responsive'], ['99%', 'deployment uptime goal'], ['24/7', 'lead capture']].map(([a,b],i)=><Reveal key={b} delay={i*.06}><div className="stat"><strong>{a}</strong><span>{b}</span></div></Reveal>)}
      </section>

      <section id="services" className="section">
        <Reveal><div className="section-head"><div><span className="eyebrow">WHAT I BUILD</span><h2>Everything your <span>first impression</span> needs.</h2></div><p>One polished system from design to deployment — no disconnected freelancers, plugins or half-finished pages.</p></div></Reveal>
        <div className="service-grid">{services.map((s,i)=>{ const Icon = iconMap[s.icon as keyof typeof iconMap] || iconMap.Sparkles; return <Reveal key={s.title} delay={i*.05}><article className="service-card"><div className="icon-box"><Icon/></div><span className="service-no">0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p><a href="#contact">Discuss this <iconMap.ArrowRight size={15}/></a></article></Reveal> })}</div>
      </section>

      <section id="work" className="section work-section">
        <Reveal><div className="section-head"><div><span className="eyebrow">SELECTED CONCEPTS</span><h2>Built for <span>real businesses.</span></h2></div><p>Use these concepts as your portfolio demos and swap in a client's brand, photos, copy and services.</p></div></Reveal>
        <div className="work-grid">{projects.map((p,i)=><Reveal key={p.title} delay={i*.08}><article className={`project-card p${i+1}`}><div className="project-art"><div className="art-window"><small>{p.tag.toUpperCase()}</small><h3>{p.title}</h3><div className="art-bars"><i/><i/><i/></div></div></div><div className="project-body"><span>{p.tag}</span><h3>{p.title}</h3><p>{p.text}</p><b>{p.metric}</b></div></article></Reveal>)}</div>
      </section>

      <section id="about" className="section split">
        <Reveal className="about-visual"><div className="grid-art"><div className="scan"/><div className="cube">N</div><span className="tag t1">REACT</span><span className="tag t2">SUPABASE</span><span className="tag t3">CLOUDFLARE</span></div></Reveal>
        <Reveal delay={.12}><div><span className="eyebrow">WHY THIS TEMPLATE WORKS</span><h2>Premium visuals. <span>Practical business results.</span></h2><p className="lead">The reference you shared has a futuristic, high-contrast visual language. This version keeps that premium energy but turns it into a reusable business template that can be adapted for restaurants, agencies, consultants, startups and local businesses.</p><ul className="check-list"><li><iconMap.CheckCircle2/> Clear conversion path from hero → proof → services → enquiry</li><li><iconMap.CheckCircle2/> Motion used for hierarchy, not distraction</li><li><iconMap.CheckCircle2/> Supabase stores every enquiry in one database</li><li><iconMap.CheckCircle2/> GitHub + Cloudflare gives continuous deployment</li></ul><a className="btn primary" href="#contact">Start Your Demo <iconMap.ArrowRight/></a></div></Reveal>
      </section>

      <section className="section testimonial-section">
        <Reveal><div className="section-head"><div><span className="eyebrow">SOCIAL PROOF</span><h2>What clients could <span>say next.</span></h2></div></div></Reveal>
        <div className="testimonial-grid">{testimonials.map((t,i)=><Reveal key={t.name} delay={i*.07}><article className="testimonial"><div className="stars">{[1,2,3,4,5].map(x=><iconMap.Star key={x} fill="currentColor" size={15}/>)}</div><p>“{t.quote}”</p><div><b>{t.name}</b><small>{t.role}</small></div></article></Reveal>)}</div>
      </section>

      <section id="contact" className="section contact-wrap">
        <Reveal><div className="contact-card"><div className="contact-copy"><span className="eyebrow">LET'S BUILD</span><h2>Have a project in mind?</h2><p>Tell me what you are building. I can turn the idea into a responsive website, connect the backend and launch it on your domain.</p><div className="contact-details"><a href="mailto:hello@suryadevs.in"><iconMap.Mail/> hello@suryadevs.in</a><a href={wa} target="_blank" rel="noreferrer"><iconMap.MessageCircle/> WhatsApp</a></div></div><ContactForm/></div></Reveal>
      </section>
    </main>
    <footer><div className="footer-inner"><div className="brand"><span className="brand-mark">N</span><span><b>Nexa</b>Flow<small>WEB • DIGITAL • GROWTH</small></span></div><div><span>React • TypeScript • Supabase • Cloudflare</span><small>© {new Date().getFullYear()} NexaFlow. Demo template by Surya.</small></div><a href="#home">Back to top ↑</a></div></footer>
    <a className="floating-wa" href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><iconMap.MessageCircle/></a>
  </div>
}

export default function App() {
  return <Routes><Route path="/bussiness_model" element={<Home/>}/><Route path="/" element={<Navigate to="/bussiness_model" replace/>}/><Route path="*" element={<Navigate to="/bussiness_model" replace/>}/></Routes>
}
