import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatINR } from '../data'

// rolling number: eases from the previous total to the new one (up or down)
function useRollingNumber(target, ms = 750) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  useEffect(() => {
    const from = fromRef.current
    if (from === target) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(from + (target - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return value
}

// Pacing: cumulative across all 7 categories (Level 1 + Level 2). The meter
// is driven by the running total, mapped on a sqrt curve so cheap picks land
// a real nudge while expensive ones jump far. MAX_TOTAL = sum of the dearest
// option in every category, mapped to 0.92 → meter never tops out.
const MAX_TOTAL = 100e7 * 7 // ₹700 cr if you max every category (5-tier T5 × 7)
function needlePos(total) {
  if (total <= 0) return 0
  return Math.min(0.92, Math.sqrt(total / MAX_TOTAL) * 0.92)
}

// flame grows as the total climbs, dramatically more for chaotic combos
function flameScale(total) {
  return 1 + Math.min(0.7, Math.sqrt(total / MAX_TOTAL) * 0.7)
}

const TICKS = Array.from({ length: 13 })

export default function BurnMeter({ total }) {
  const rolling = useRollingNumber(total)
  const pos = needlePos(rolling)
  const fScale = flameScale(rolling)

  // brief flame flare whenever the total changes
  const [flare, setFlare] = useState(false)
  const prev = useRef(total)
  useEffect(() => {
    if (prev.current === total) return
    prev.current = total
    setFlare(true)
    const t = setTimeout(() => setFlare(false), 500)
    return () => clearTimeout(t)
  }, [total])

  return createPortal(
    <div className="burn-meter">
      <div className="burn-track">
        <div className="burn-heat" />
        <div className="burn-cool" style={{ left: `${pos * 100}%` }} />
        <div className="burn-ticks">
          {TICKS.map((_, i) => (
            <span key={i} className="burn-tick" />
          ))}
        </div>

        <div className={`burn-marker${flare ? ' flare' : ''}`} style={{ left: `${pos * 100}%` }}>
          <div className="burn-note-wrap">
          <img className="burn-note" src="/assets/rupee-note.png" alt="" />
          <svg className="burn-flame-svg" viewBox="0 0 40 32" aria-hidden="true">
            <g className="burn-sparks" style={{ transform: `scale(${fScale})`, transformOrigin: '20px 22px' }}>
              <path className="spark spark-1" d="M31 5 l0.9 2.2 2.2 0.9 -2.2 0.9 -0.9 2.2 -0.9 -2.2 -2.2 -0.9 2.2 -0.9 Z" fill="#FFE7A8" />
              <circle className="spark spark-2" cx="13" cy="4" r="1.1" fill="#FFF3D2" />
              <circle className="spark spark-3" cx="29" cy="17" r="1" fill="#FFD98A" />
            </g>
            <g className="burn-flame" style={{ transform: `scale(${fScale})`, transformOrigin: '20px 24px' }}>
              <path d="M20 4 C26 10 28.5 14 28.5 19 a8.5 8.5 0 0 1 -17 0 C11.5 14 14 10 20 4 Z" fill="#FF7A3D" />
              <path d="M20 8 C24 13 25.5 15.5 25.5 19 a5.5 5.5 0 0 1 -11 0 C14.5 15.5 16 13 20 8 Z" fill="#FF4D4D" />
              <path d="M20 12.5 C22.4 15.5 23.4 17 23.4 19 a3.4 3.4 0 0 1 -6.8 0 C16.6 17 17.6 15.5 20 12.5 Z" fill="#F5A623" />
              <path d="M20 15.5 C21.3 17.2 21.9 18 21.9 19.2 a1.9 1.9 0 0 1 -3.8 0 C18.1 18 18.7 17.2 20 15.5 Z" fill="#FFE39A" />
            </g>
          </svg>
          </div>
        </div>
      </div>

      <div className="burn-amount">₹{formatINR(rolling)}</div>
    </div>,
    document.body
  )
}
