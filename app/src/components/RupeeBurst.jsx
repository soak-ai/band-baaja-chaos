import { useMemo } from 'react'
import { createPortal } from 'react-dom'

// Fountain effect: notes spawn along the top edge of the card,
// arc upward briefly then fall downward through/past the card.
export default function RupeeBurst({ x, y, width = 260 }) {
  const notes = useMemo(() => (
    Array.from({ length: 48 }, (_, i) => {
      const spread = (Math.random() - 0.5) * width * 0.9
      const rise   = -(60 + Math.random() * 120)  // upward arc
      const fall   = 380 + Math.random() * 280     // fall past card
      return {
        id: i,
        dx:       spread,
        rise:     rise,
        fall:     fall,
        size:     26 + Math.random() * 18,
        delay:    Math.random() * 0.35,
        duration: 1.4 + Math.random() * 0.7,
        spin:     (Math.random() - 0.5) * 540,
        drift:    (Math.random() - 0.5) * 60,
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
            width: n.size,
            height: n.size,
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
