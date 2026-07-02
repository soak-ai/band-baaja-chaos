import { useEffect, useState } from 'react'
import Confetti from './Confetti'
import { sound } from '../sound'

// L1 → L2: line1 fades, line2 appears, then bounces + launches upward (Option B)
export default function Transition({ onDone }) {
  const [phase, setPhase] = useState('line1') // line1 | hiding1 | line2 | launching | leaving

  useEffect(() => {
    sound.play('shehnai')
    sound.playClip('dhol', 5.5, 0.3, 2.0)
    const timers = [
      setTimeout(() => setPhase('hiding1'),   1100),
      setTimeout(() => setPhase('line2'),     1500),
      // line2 tinkering: 0.3s fade + 0.4s stutter = done at ~2.2s
      // then rests on screen for ~1.5s before fading out
      setTimeout(() => setPhase('launching'), 3600),
      setTimeout(onDone,                      4200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <main className={`screen transition${phase === 'leaving' ? ' transition-leaving' : ''}`}>
      <div className="transition-ambient" aria-hidden="true" />
      <Confetti fast />
      {(phase === 'line1' || phase === 'hiding1') && (
        <p className={`transition-sub${phase === 'hiding1' ? ' transition-sub-out' : ''}`}>
          crazy scene set.
        </p>
      )}
      {(phase === 'line2' || phase === 'launching') && (
        <p className="transition-line">
          shubh kaam mein deri kaisi<span className={`transition-qmark${phase === 'launching' ? ' transition-qmark-flutter' : ''}`}>?</span>
        </p>
      )}
    </main>
  )
}
