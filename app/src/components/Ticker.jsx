import { useMemo } from 'react'

// Two columns of pick images scrolling in opposite directions
export default function Ticker({ picks, dim }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img,
      picks.venue?.img,
      picks.entry?.img,
      picks.music?.img,
      picks.food?.img,
      picks.wildcard?.img,
    ].filter(Boolean)

    // shuffle
    const shuffled = [...imgs].sort(() => Math.random() - 0.5)

    // repeat to fill columns without gaps (need at least ~12 per column)
    const repeated = []
    while (repeated.length < 14) repeated.push(...shuffled)
    return repeated
  }, [picks])

  const left  = images.slice(0, 7)
  const right = images.slice(7, 14)

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-col ticker-col-up">
        {[...left, ...left].map((img, i) => (
          <div key={i} className="ticker-card">
            <img src={`/assets/${img}.png`} alt="" draggable="false" />
          </div>
        ))}
      </div>
      <div className="ticker-col ticker-col-down">
        {[...right, ...right].map((img, i) => (
          <div key={i} className="ticker-card">
            <img src={`/assets/${img}.png`} alt="" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  )
}
