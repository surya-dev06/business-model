import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Clock, X } from 'lucide-react'

type Props = {
  name: string
  email: string
  time: string
  refId: string
  fileCount: number
  warning?: string
  onClose: () => void
}

/** Animated "request sent" card: pops in, draws a tick over a feel-good image, shows the send time, auto-closes. */
export function SuccessCard({ name, email, time, refId, fileCount, warning, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // portal -> the card is never trapped inside a transformed (hovered) parent card
  return createPortal(
    <div className="pf-root pf-portal">
      <div className="success-overlay" onClick={onClose}>
        <div
          className="success-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pf-success-title"
          onClick={e => e.stopPropagation()}
        >
          <button type="button" aria-label="Close" onClick={onClose} className="success-close"><X size={16} /></button>

          <div className="success-media">
            <img src="/images/portfolio/success.svg" alt="" />
            <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path className="success-tick" d="M288 192 L312 216 L354 166" />
            </svg>
          </div>

          <div className="success-body">
            <h3 id="pf-success-title">Proposal request sent! 🎉</h3>
            <p>
              Thank you, <strong>{name}</strong>. I've received your requirements
              {fileCount > 0 && <> along with <strong>{fileCount} attachment{fileCount > 1 ? 's' : ''}</strong></>}.
              {' '}I'll reply to <strong>{email}</strong> within <strong>12–24 hours</strong>.
            </p>
            {warning && <p className="success-warning">{warning}</p>}
            <div className="success-meta">
              <span className="success-time"><Clock size={14} /> {time}</span>
              <span className="success-ref">Ref #{refId}</span>
            </div>
            <button type="button" className="btn-primary success-btn" onClick={onClose}>Done</button>
          </div>

          <div className="success-timer"><i onAnimationEnd={onClose} /></div>
        </div>
      </div>
    </div>,
    document.body,
  )
}