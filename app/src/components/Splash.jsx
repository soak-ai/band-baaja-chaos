import { useEffect, useState } from 'react'

export default function Splash({ onDone }) {
  const [phase, setPhase] = useState('reveal')

  useEffect(() => {
    const toLoading = setTimeout(() => setPhase('loading'), 2200)
    const done = setTimeout(onDone, 4300)
    return () => {
      clearTimeout(toLoading)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <main className="screen splash">
      <div className={`splash-stage${phase === 'loading' ? ' is-hidden' : ''}`} aria-hidden="true">
        <div className="splash-bg" />
        <div className="splash-sheen" />
        <div className="splash-lotus-cover" />
        <img className="splash-brandmark" src="/og-image-v2.png" alt="" />
      </div>
      {phase === 'loading' && (
        <div className="splash-loading is-shown">
          <svg className="splash-spinner" viewBox="0 0 44 44" aria-hidden="true">
            {Array.from({ length: 12 }, (_, k) => {
              const angle = (k / 12) * 360
              const rad = (angle * Math.PI) / 180
              const cx = 22, cy = 22, r1 = 11, r2 = 17
              const x1 = cx + r1 * Math.sin(rad), y1 = cy - r1 * Math.cos(rad)
              const x2 = cx + r2 * Math.sin(rad), y2 = cy - r2 * Math.cos(rad)
              const opacity = (k / 12)
              return (
                <line key={k} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#E87060" strokeWidth="2.8" strokeLinecap="round"
                  opacity={opacity} />
              )
            })}
          </svg>
          <p className="microline">wedding of the century, loading...</p>
        </div>
      )}
    </main>
  )
}
