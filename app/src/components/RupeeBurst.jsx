import { useMemo } from 'react'
import { createPortal } from 'react-dom'

export default function RupeeBurst({ x, y }) {
  const notes = useMemo(() => (
    Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * 360 + (Math.random() - 0.5) * 18
      const burst = 100 + Math.random() * 120
      const rad = (angle * Math.PI) / 180
      return {
        id: i,
        bx: Math.cos(rad) * burst,
        by: Math.sin(rad) * burst,
        fall: 700 + Math.random() * 400, // enough to fall off bottom of screen
        size: 32 + Math.random() * 22,
        delay: Math.random() * 0.25,
        duration: 1.6 + Math.random() * 0.8,
        spin: (Math.random() - 0.5) * 540,
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
            transform: 'translate(-50%, -50%)',
            '--bx': `${n.bx}px`,
            '--by': `${n.by}px`,
            '--fall': `${n.fall}px`,
            '--spin': `${n.spin}deg`,
            animation: `money-burst ${n.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${n.delay}s both`,
          }}
        />
      ))}
    </div>,
    document.body
  )
}
