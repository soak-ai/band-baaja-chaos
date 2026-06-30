import { useEffect, useState } from 'react'
import { sound } from '../sound'

// SHUBH MUHURAT — auto-playing kinetic type, ~12s, no taps.
// inserts read the user's actual venue + guest count from state.
export default function Level3({ picks, onDone }) {
  const [beat, setBeat] = useState(0)

  const venue = picks.venue?.insert || 'the venue'
  const guests = picks.guests?.name || 'everyone'

  useEffect(() => {
    // L2 → L3: the big moment — dhol at 50%, fading out over its last second so
    // it's quiet by the time the final card's confetti bursts (smooth, not jarring)
    sound.playClip('dhol', 11, 0.5, 2.2)
    const timers = [
      setTimeout(() => setBeat(1), 900),
      setTimeout(() => setBeat(2), 3800),
      setTimeout(() => setBeat(3), 7000),
      setTimeout(() => sound.play('shehnai'), 9200), // fires on beat-crash shimmer, not text-appear
      setTimeout(() => setBeat(4), 9200),
      setTimeout(onDone, 10800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <main className="screen level3">
      <p className="level3-eyebrow">
        <img src="/assets/marigold-orange.png" className="eyebrow-flower" alt="" aria-hidden="true" />
        <span className="eyebrow-label">Shubh muhurat</span>
        <img src="/assets/marigold-orange.png" className="eyebrow-flower" alt="" aria-hidden="true" />
      </p>
      <div className="level3-stage">
        {beat === 1 && (
          <h2 key="b1" className="beat">
            it's happening.
          </h2>
        )}
        {beat === 2 && (
          <h2 key="b2" className="beat">
            {venue} packed.
            <br />
            {guests} showed up.
          </h2>
        )}
        {beat >= 3 && (
          <h2 key="b3" className={`beat${beat === 4 ? ' beat-crash' : ''}`}>
            pheras happened<br />anyway.
          </h2>
        )}
      </div>
    </main>
  )
}
