import { useEffect, useRef, useState } from 'react'

const SPARKS = [
  { top: '-4%', left: '12%', s: 16, d: '0s' },
  { top: '32%', left: '94%', s: 17, d: '1.1s' },
  { top: '96%', left: '8%', s: 13, d: '0.6s' },
]

export default function Home({ onStart }) {
  const glowRef = useRef(null)
  const btnRef = useRef(null)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const apply = (dx, dy) => {
      const el = glowRef.current
      if (!el) return
      const cx = Math.max(-14, Math.min(14, dx))
      const cy = Math.max(-14, Math.min(14, dy))
      el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`
    }
    const onPointer = (e) =>
      apply(-(e.clientX / window.innerWidth - 0.5) * 28, -(e.clientY / window.innerHeight - 0.5) * 28)
    let startY = 0
    const onTouchStart = (e) => (startY = e.touches[0].clientY)
    const onTouchMove = (e) => apply(0, (e.touches[0].clientY - startY) * 0.25)
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const handleStart = () => {
    if (leaving) return
    const el = btnRef.current
    if (el) {
      el.classList.add('pressing')
      setTimeout(() => el.classList.remove('pressing'), 180)
    }
    setLeaving(true)
    setTimeout(onStart, 520)
  }

  return (
    <main className={`screen home${leaving ? ' home-leaving' : ''}`}>
      <div className="home-glow" ref={glowRef} aria-hidden="true" />

      {/* fairy-light arch — single catenary spanning full width at top */}
      <div className="home-fairy-wrap" aria-hidden="true">
        <img className="fairy-arch" src="/assets/fairy.png" alt="" />
      </div>

      <div className="home-hero">
        <div className="home-headline-wrap">
          {SPARKS.map((sp, i) => (
            <svg
              key={i}
              className="home-spark"
              style={{ top: sp.top, left: sp.left, width: sp.s, height: sp.s, animationDelay: sp.d }}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#F0D165" />
            </svg>
          ))}
          <svg className="arch" viewBox="0 0 420 196" role="img" aria-label="internet's biggest wedding, your best decisions">
            <defs>
              <path id="arc-1" d="M2 56 Q210 46 418 56" fill="none" />
              <path id="arc-2" d="M2 114 Q210 104 418 114" fill="none" />
              <path id="arc-3" d="M2 174 Q210 164 418 174" fill="none" />
            </defs>
            <text className="arch-text" textAnchor="middle"><textPath href="#arc-1" startOffset="50%">internet's</textPath></text>
            <text className="arch-text" textAnchor="middle"><textPath href="#arc-2" startOffset="50%">biggest wedding,</textPath></text>
            <text className="arch-text" textAnchor="middle"><textPath href="#arc-3" startOffset="50%">your best decisions</textPath></text>
          </svg>
        </div>

        <p className="home-subline">
          unlimited budget.
          <br />
          zero consequences.
          <br />
          log kya kahenge?
          <br />
          let them.
        </p>
      </div>

      <button ref={btnRef} className="glass-btn glass-btn-ready home-cta" onClick={handleStart}>
        haan bol do?
      </button>
    </main>
  )
}
