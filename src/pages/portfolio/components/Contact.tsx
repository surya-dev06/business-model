import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent, KeyboardEvent } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
// import { Check, CircleAlert, CloudUpload, Lock, Paperclip, TriangleAlert, X, Zap } from 'lucide-react'
import { CircleAlert, CloudUpload, Lock, Paperclip, TriangleAlert, X, Zap } from 'lucide-react'
import { portfolioSupabase } from '../../../lib/portfolioSupabase'
import { Reveal } from './Reveal'
import { SuccessCard } from './SuccessCard'
import { CONTACT, SERVICE_OPTIONS, SERVICE_OPTION_LABELS } from '../data'

const TABLE_NAME = 'inquiries'
const BUCKET_NAME = 'requirements'
const MAX_FILE_MB = 10
const MAX_FILES = 5
const FILE_ACCEPT =
  '.pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.png,.jpg,.jpeg,.webp,.gif,.fig,.sketch,.xd,.ai,.psd,.json,.xml,.md'

type Status =
  | { type: 'error'; message: string }
  | { type: 'failed'; message: string }
  | { type: 'success'; name: string; email: string; fileCount: number; warning: string; ref: string; time: string }
  // | { type: 'success'; name: string; email: string; fileCount: number; warning: string; ref: string }

const errMessage = (e: unknown) =>
  e instanceof Error ? e.message : (e as { message?: string } | null)?.message || 'Unknown error'

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`

async function uploadFiles(client: SupabaseClient, files: File[]) {
  const urls: string[] = []
  for (const file of files) {
    const safeName = file.name.replace(/[^\w.-]+/g, '_').slice(-80)
    const path = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${safeName}`
    const { error } = await client.storage.from(BUCKET_NAME).upload(path, file, { cacheControl: '3600', upsert: false })
    if (error) throw new Error(`Upload failed for "${file.name}": ${error.message}`)
    const { data } = client.storage.from(BUCKET_NAME).getPublicUrl(path)
    if (data?.publicUrl) urls.push(data.publicUrl)
  }
  return urls
}

type Props = { service: string; onServiceChange: (service: string) => void }

export function Contact({ service, onServiceChange }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<Status | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status && status.type !== 'success') statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [status])

  function addFiles(list: FileList | File[]) {
    const next = [...files]
    let err = ''
    for (const f of Array.from(list)) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) { err = `"${f.name}" is larger than ${MAX_FILE_MB} MB and was skipped.`; continue }
      if (next.some(x => x.name === f.name && x.size === f.size)) continue
      if (next.length >= MAX_FILES) { err = `You can attach up to ${MAX_FILES} files.`; break }
      next.push(f)
    }
    setFiles(next)
    setFileError(err)
  }

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ''
  }
  const onDrop = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }
  const onDrag = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragOver(true) }
  const onDragEnd = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragOver(false) }
  const onZoneKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.current?.click() }
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setStatus(null)

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (cleanName.length < 2) return setStatus({ type: 'error', message: 'Please enter your full name.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) return setStatus({ type: 'error', message: 'Please enter a valid email address.' })
    if (cleanMessage.length < 10) return setStatus({ type: 'error', message: 'Please add a few more details about your project (min 10 characters).' })
    if (!portfolioSupabase) return setStatus({ type: 'error', message: 'Backend not configured. Please email me directly instead.' })

    setBusy(true)
    const startedAt = Date.now()

    try {
      let fileUrls: string[] = []
      let warning = ''

      if (files.length > 0) {
        try {
          fileUrls = await uploadFiles(portfolioSupabase, files)
        } catch (uploadErr) {
          console.error('Storage upload error:', uploadErr)
          warning = `Note: attachments could not be uploaded (${errMessage(uploadErr)}). Please email them to me directly.`
        }
      }

      let { error } = await portfolioSupabase
        .from(TABLE_NAME)
        .insert([{ name: cleanName, email: cleanEmail, service, message: cleanMessage, file_urls: fileUrls }])

      // Fallback if the file_urls column doesn't exist yet
      if (error && /file_urls|column|schema/i.test(error.message || '')) {
        console.warn('file_urls column missing — falling back to message-only insert.')
        const note = fileUrls.length ? `\n\n--- Attachments ---\n${fileUrls.join('\n')}` : ''
        const retry = await portfolioSupabase
          .from(TABLE_NAME)
          .insert([{ name: cleanName, email: cleanEmail, service, message: cleanMessage + note }])
        error = retry.error
      }
      if (error) throw error

      const elapsed = Date.now() - startedAt
      if (elapsed < 700) await new Promise(r => setTimeout(r, 700 - elapsed))

      setStatus({
        type: 'success',
        name: cleanName,
        email: cleanEmail,
        fileCount: fileUrls.length,
        warning,
        ref: Date.now().toString().slice(-8),
          time: new Date().toLocaleString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        }),
      })
      setName(''); setEmail(''); setMessage(''); setFiles([]); setFileError('')
      onServiceChange(SERVICE_OPTIONS[0])
    } catch (err) {
      console.error('Submission error:', err)
      setStatus({ type: 'failed', message: errMessage(err) })
    } finally {
      setBusy(false)
    }
  }

  const label = 'block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2'

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal from="scale" className="card p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono uppercase tracking-widest mb-4">
              <Zap size={12} /> Fast Response
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">Start a Project</h2>
            <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
              Share your idea and attach any requirement files. I'll review everything and reply within{' '}
              <span className="text-cyan-400 font-semibold">12–24 hours</span>.
            </p>
          </div>

          <form onSubmit={submit} noValidate className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="pf-name" className={label}>Your Name <span className="text-cyan-400">*</span></label>
                <input id="pf-name" type="text" required autoComplete="name" className="field" placeholder="e.g. Arun Kumar"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="pf-email" className={label}>Email Address <span className="text-cyan-400">*</span></label>
                <input id="pf-email" type="email" required autoComplete="email" className="field" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="pf-service" className={label}>Service Required <span className="text-cyan-400">*</span></label>
              <select id="pf-service" required className="field" value={service} onChange={e => onServiceChange(e.target.value)}>
                {SERVICE_OPTIONS.map(o => <option key={o} value={o}>{SERVICE_OPTION_LABELS[o]}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="pf-message" className={label}>Project Details <span className="text-cyan-400">*</span></label>
              <textarea id="pf-message" rows={4} required className="field resize-y"
                placeholder="Tell me about your project — goals, features, timeline, budget..."
                value={message} onChange={e => setMessage(e.target.value)} />
            </div>

            <div>
              <span className={label}>Requirements File <span className="text-slate-600 normal-case">(optional)</span></span>
              <div
                className={`drop-zone ${dragOver ? 'dragover' : ''}`}
                role="button"
                tabIndex={0}
                aria-label="Upload requirement files"
                onClick={() => fileInput.current?.click()}
                onKeyDown={onZoneKey}
                onDragEnter={onDrag}
                onDragOver={onDrag}
                onDragLeave={onDragEnd}
                onDrop={onDrop}
              >
                <input ref={fileInput} type="file" multiple className="hidden" accept={FILE_ACCEPT} onChange={onPick} />
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                    <CloudUpload size={22} />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">
                    <span className="text-cyan-400">Click to upload</span> or drag &amp; drop
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">PDF · DOC · XLS · PPT · ZIP · Images · Figma · Max 10 MB each</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <div key={`${f.name}-${f.size}`} className="file-pill">
                    <Paperclip size={14} className="text-cyan-400" />
                    <span className="flex-1 truncate text-slate-200">{f.name}</span>
                    <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">{formatSize(f.size)}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${f.name}`}
                      onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
              {fileError && <p className="text-[11px] text-red-400 mt-2">{fileError}</p>}
            </div>

            <button type="submit" disabled={busy} className="btn-primary w-full py-4 rounded-xl tracking-wide text-sm sm:text-base">
              {busy ? (
                <><span className="spinner" />&nbsp; {files.length ? 'Uploading files & sending…' : 'Sending your request…'}</>
              ) : 'Send Proposal Request'}
            </button>

            <div ref={statusRef} role="status" aria-live="polite">
              {status?.type === 'error' && (
                <div className="banner-in rounded-2xl p-5 text-sm leading-relaxed bg-red-500/10 border border-red-500/35 text-red-300 flex items-center gap-2">
                  <CircleAlert size={16} className="shrink-0" /> {status.message}
                </div>
              )}

              {status?.type === 'failed' && (
                <div className="banner-in rounded-2xl p-5 text-sm leading-relaxed bg-red-500/10 border border-red-500/35 text-red-300 flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                    <TriangleAlert size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-red-200 text-base mb-1">Submission failed</p>
                    <p className="text-red-200/85 text-[13px] leading-relaxed">
                      {status.message}<br />
                      Please try again, or email me directly at{' '}
                      <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.
                    </p>
                  </div>
                </div>
              )}

              {status?.type === 'success' && (
                // <div className="banner-in rounded-2xl p-5 text-sm leading-relaxed bg-emerald-500/10 border border-emerald-500/35 text-emerald-300 flex items-start gap-3">
                //   <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                //     <Check size={18} />
                //   </div>
                //   <div>
                //     <p className="font-bold text-emerald-200 text-base mb-1">Proposal request sent successfully! 🎉</p>
                //     <p className="text-emerald-200/85 text-[13px] leading-relaxed">
                //       Thank you, <strong>{status.name}</strong>. I've received your requirements
                //       {status.fileCount > 0 && <> along with <strong>{status.fileCount} attachment{status.fileCount > 1 ? 's' : ''}</strong></>}.
                //       {' '}I'll review everything and get back to you at <strong>{status.email}</strong> within{' '}
                //       <strong className="text-emerald-100">12–24 hours</strong>.
                //     </p>
                //     {status.warning && (
                //       <p className="text-amber-300 text-xs mt-2 flex items-start gap-1.5">
                //         <TriangleAlert size={13} className="mt-0.5 shrink-0" /> {status.warning}
                //       </p>
                //     )}
                //     <p className="text-emerald-200/60 text-[11px] mt-2 font-mono">Ref: #{status.ref}</p>
                //   </div>
                // </div>
                <SuccessCard
                  name={status.name}
                  email={status.email}
                  time={status.time}
                  refId={status.ref}
                  fileCount={status.fileCount}
                  warning={status.warning}
                  onClose={() => setStatus(null)}
                />
              )}
            </div>

            <p className="text-center text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1.5">
              <Lock size={12} /> Your details are stored securely and never shared.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
