import { useMemo } from 'react'
import { createPortal } from 'react-dom'

const MARIGOLDS = ['marigold-pink', 'marigold-orange', 'marigold-yellow']

// falling marigold-petal confetti — mixed colours, varied size + rotation
export default function Confetti({ count = 42 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 10, // 12–22px — petal-sized, not overpowering
        delay: Math.random() * 0.4,
        duration: 3.6 + Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 140,
        spin: (Math.random() - 0.5) * 540,
        img: MARIGOLDS[i % MARIGOLDS.length],
      })),
    [count]
  )

  // portal to document.body so position:fixed is relative to viewport,
  // not any transformed ancestor (.screen uses transform in screen-in animation)
  return createPortal(
    <div className="confetti" aria-hidden="true">
      {petals.map((p) => (
        <img
          key={p.id}
          className="pom"
          src={`/assets/${p.img}.png`}
          alt=""
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>,
    document.body
  )
}
