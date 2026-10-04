import { FormEvent, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { iconMap } from './Icons'

export function ContactForm() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', service: 'Business website', message: '' })

  // const whatsapp = () => {
  //   const number = import.meta.env.local.VITE_WHATSAPP_NUMBER || '919876543210'
  //   const text = encodeURIComponent(`Hi NexaFlow, I'm ${form.name || 'interested in a project'}. I need a ${form.service}.`)
  //   window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener,noreferrer')
  // }

  const whatsapp = () => {
    const raw = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const number = raw.replace(/\D/g, '')
    // const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const text = encodeURIComponent(`Hi NexaFlow, I'm ${form.name || 'interested in a project'}. I need a ${form.service}.`)
    window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true); setMessage('')
    if (!supabase) {
      setMessage('Add your Supabase environment variables first.')
      setBusy(false); return
    }
    const { error } = await supabase.from('contact_submissions').insert(form)
    setBusy(false)
    if (error) setMessage('Something went wrong. Please try WhatsApp instead.')
    else {
      setMessage('Thanks! Your enquiry was received. We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', business: '', service: 'Business website', message: '' })
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="field-grid">
      <label>Name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" /></label>
      <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@company.com" /></label>
    </div>
    <div className="field-grid">
      <label>Phone<input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="+91..." /></label>
      <label>Business<input value={form.business} onChange={e => setForm({...form, business:e.target.value})} placeholder="Restaurant, agency, startup..." /></label>
    </div>
    <label>What do you need?
      <select value={form.service} onChange={e => setForm({...form, service:e.target.value})}>
        <option>Business website</option><option>E-commerce website</option><option>Web application</option><option>Mobile application</option><option>Website redesign</option><option>Other</option>
      </select>
    </label>
    <label>Project brief<textarea required rows={5} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell us about your project, pages, features and target launch date..." /></label>
    <div className="form-actions">
      <button className="btn primary" disabled={busy}>{busy ? 'Sending...' : 'Send Enquiry'} <iconMap.Send size={17}/></button>
      <button type="button" className="btn whatsapp" onClick={whatsapp}><iconMap.MessageCircle size={18}/> WhatsApp</button>
    </div>
    {message && <p className="form-message">{message}</p>}
  </form>
}
