import { useMemo } from 'react'
import { createPortal } from 'react-dom'

export default function RupeeBurst({ x, y }) {
  const notes = useMemo(() => (
    Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * 360 + (Math.random() - 0.5) * 20
      const dist = 90 + Math.random() * 130
      const rad = (angle * Math.PI) / 180
      return {
        id: i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        size: 30 + Math.random() * 22,
        delay: Math.random() * 0.25,
        duration: 1.1 + Math.random() * 0.5,
        spin: (Math.random() - 0.5) * 400,
      }
    })
  ), [])

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
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
            '--dx': `${n.dx}px`,
            '--dy': `${n.dy}px`,
            '--spin': `${n.spin}deg`,
            animation: `rupee-fly ${n.duration}s ease-out ${n.delay}s both`,
          }}
        />
      ))}
    </div>,
    document.body
  )
}
