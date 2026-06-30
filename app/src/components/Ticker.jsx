import { useMemo } from 'react'

// Two columns of 3 pick images each, scrolling in opposite directions
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
    return [...imgs].sort(() => Math.random() - 0.5)
  }, [picks])

  // 3 per column — duplicate once for seamless loop
  const left  = images.slice(0, 3)
  const right = images.slice(3, 6)

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
