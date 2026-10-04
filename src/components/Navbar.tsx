import { useState } from 'react'
import { Link } from 'react-router-dom'
import { iconMap } from './Icons'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const Menu = iconMap.Menu
  const X = iconMap.X
  const links = [['Home', '#home'], ['Services', '#services'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact']]
  return (
    <header className="nav-wrap">
      <nav className="nav glass">
        <Link to="/bussiness_model" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">N</span>
          <span><b>Nexa</b>Flow<small>WEB • DIGITAL • GROWTH</small></span>
        </Link>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a Project <iconMap.ArrowRight size={15}/></a>
        </div>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </nav>
    </header>
  )
}
