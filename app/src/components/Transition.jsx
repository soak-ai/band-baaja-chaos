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
      setTimeout(() => setPhase('hiding1'),   1600),
      setTimeout(() => setPhase('line2'),     2100),
      setTimeout(() => setPhase('launching'), 4500), // bounce then shoot up
      setTimeout(() => setPhase('leaving'),   5100), // screen fades
      setTimeout(onDone,                      5500),
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
        <p className={`transition-line${phase === 'launching' ? ' transition-line-launch' : ''}`}>
          shubh kaam mein deri kaisi?
        </p>
      )}
    </main>
  )
}
