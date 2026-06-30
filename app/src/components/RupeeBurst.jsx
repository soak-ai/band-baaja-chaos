import { useMemo } from 'react'
import { createPortal } from 'react-dom'

export default function RupeeBurst({ x, y }) {
  const notes = useMemo(() => (
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * 360 + (Math.random() - 0.5) * 30,
      dist: 80 + Math.random() * 120,
      size: 28 + Math.random() * 20,
      delay: Math.random() * 0.3,
      duration: 1.0 + Math.random() * 0.6,
      spin: (Math.random() - 0.5) * 360,
    }))
  ), [])

  return createPortal(
    <div className="rupee-burst" aria-hidden="true" style={{ '--cx': `${x}px`, '--cy': `${y}px` }}>
      {notes.map(n => {
        const rad = (n.angle * Math.PI) / 180
        const dx = Math.cos(rad) * n.dist
        const dy = Math.sin(rad) * n.dist
        return (
          <img
            key={n.id}
            className="rupee-note"
            src="/assets/500rupeenote.png"
            alt=""
            style={{
              width: n.size,
              height: n.size,
              '--dx': `${dx}px`,
              '--dy': `${dy}px`,
              '--spin': `${n.spin}deg`,
              animationDelay: `${n.delay}s`,
              animationDuration: `${n.duration}s`,
            }}
          />
        )
      })}
    </div>,
    document.body
  )
}
