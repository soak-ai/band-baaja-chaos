import { useEffect, useRef } from 'react'
import CardRow from './CardRow'
import BurnMeter from './BurnMeter'

export default function Level({ level, picks, total, onSelect, onContinue }) {
  const done = level.rows.filter((row) => picks[row.key]).length
  const ready = done === level.rows.length

  // one gentle pop the moment the button activates
  const wasReady = useRef(false)
  const btnRef = useRef(null)
  useEffect(() => {
    if (ready && !wasReady.current && btnRef.current) {
      btnRef.current.classList.remove('pop')
      void btnRef.current.offsetWidth
      btnRef.current.classList.add('pop')
    }
    wasReady.current = ready
  }, [ready])

  // satisfying press-down (0.95, 80ms in) → release (1.0, 120ms out) before nav
  const handleContinue = () => {
    const el = btnRef.current
    if (!el) return onContinue()
    el.classList.add('pressing')
    setTimeout(() => {
      el.classList.remove('pressing')
      setTimeout(onContinue, 120)
    }, 80)
  }

  return (
    <main className="screen level">
      <header className="level-header">
        <div className="level-title">
          <span className="level-kicker">LEVEL {level.n}</span>
          <span className="level-dash">-</span>
          <h2 className="level-name">{level.name}</h2>
          {level.brief && <p className="level-brief">{level.brief}</p>}
        </div>
      </header>

      {level.rows.map((row) => (
        <CardRow key={row.key} row={row} selected={picks[row.key]} onSelect={onSelect} />
      ))}

      <div className="continue-wrap">
        <button
          ref={btnRef}
          className={`glass-btn${ready ? ' glass-btn-ready' : ''}`}
          disabled={!ready}
          onClick={handleContinue}
        >
          continue
        </button>
      </div>

      <BurnMeter total={total} />
    </main>
  )
}
