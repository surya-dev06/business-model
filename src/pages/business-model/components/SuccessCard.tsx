import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Clock, X } from 'lucide-react'

type Props = { name: string; time: string; refId: string; onClose: () => void }

/** Animated "enquiry sent" card: pops in, draws a tick over a feel-good image, shows the send time, auto-closes. */
export function SuccessCard({ name, time, refId, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // portal -> never trapped inside a transformed (hovered / animated) parent
  return createPortal(
    <div className="bm-root bm-portal">
      <div className="success-overlay" onClick={onClose}>
        <div className="success-card" role="dialog" aria-modal="true" aria-labelledby="bm-success-title" onClick={e => e.stopPropagation()}>
          <button type="button" aria-label="Close" onClick={onClose} className="success-close"><X size={16} /></button>

          <div className="success-media">
            <img src="/images/business/success.svg" alt="" />
            <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path className="success-tick" d="M288 192 L312 216 L354 166" />
            </svg>
          </div>

          <div className="success-body">
            <h3 id="bm-success-title">Thank you{name ? `, ${name.split(' ')[0]}` : ''}! 🎉</h3>
            <p>Your enquiry was received successfully. We'll review it and get back to you very soon.</p>
            <div className="success-meta">
              <span className="success-time"><Clock size={14} /> {time}</span>
              <span className="success-ref">Ref #{refId}</span>
            </div>
            <button type="button" className="btn primary success-btn" onClick={onClose}>Done</button>
          </div>

          <div className="success-timer"><i onAnimationEnd={onClose} /></div>
        </div>
      </div>
    </div>,
    document.body,
  )
}