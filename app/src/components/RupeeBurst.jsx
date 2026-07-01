import { useMemo } from 'react'
import { createPortal } from 'react-dom'

// Fountain effect: notes spawn along the top edge of the card,
// arc upward briefly then fall downward through/past the card.
export default function RupeeBurst({ x, y, width = 260 }) {
  const notes = useMemo(() => (
    Array.from({ length: 48 }, (_, i) => {
      const spread = (Math.random() - 0.5) * width * 0.9
      const rise   = -(50 + Math.random() * 90)
      const fall   = 360 + Math.random() * 260
      // note is wider than tall (real 500 note ~2.4:1 ratio)
      const w = 28 + Math.random() * 16
      return {
        id: i,
        dx:       spread,
        rise,
        fall,
        w,
        h:        Math.round(w / 2.4),
        delay:    Math.random() * 0.4,
        duration: 1.5 + Math.random() * 0.7,
        spin:     (Math.random() - 0.5) * 480,
        drift:    (Math.random() - 0.5) * 55,
      }
    })
  ), [])

  return createPortal(
    <div
      style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 99999 }}
      aria-hidden="true"
    >
      {notes.map(n => (
        <img
          key={n.id}
          src="/assets/500rupeenote.png"
          alt=""
          style={{
            position: 'absolute',
            width: n.w,
            height: n.h,
            transform: 'translate(-50%, 0)',
            '--dx':    `${n.dx}px`,
            '--rise':  `${n.rise}px`,
            '--fall':  `${n.fall}px`,
            '--drift': `${n.drift}px`,
            '--spin':  `${n.spin}deg`,
            animation: `rupee-fountain ${n.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${n.delay}s both`,
          }}
        />
      ))}
    </div>,
    document.body
  )
}
