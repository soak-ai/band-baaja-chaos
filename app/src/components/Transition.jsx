import { useEffect, useState } from 'react'
import Confetti from './Confetti'
import { sound } from '../sound'

// L1 → L2: two lines appear sequentially.
// Line 1 fades in, holds 1.2s, fades out. Line 2 fades in after line 1 is gone.
// Ambient parallax glow behind the text adds energy. Audio unchanged.
export default function Transition({ onDone }) {
  const [phase, setPhase] = useState('line1') // line1 | hiding1 | line2 | leaving

  useEffect(() => {
    sound.play('shehnai')
    sound.playClip('dhol', 5, 0.3, 3.0) // extended fade so music covers line 2 hold
    const timers = [
      setTimeout(() => setPhase('hiding1'),  1600), // line 1 holds 1.6s, then starts fading
      setTimeout(() => setPhase('line2'),    2100), // line 2 appears after line 1 fades out
      setTimeout(() => setPhase('leaving'),  3700), // line 2 holds same ~1.6s
      setTimeout(onDone,                    4400),
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
      {phase === 'line2' && (
        <p className="transition-line">shubh kaam mein deri kaisi?</p>
      )}
    </main>
  )
}
