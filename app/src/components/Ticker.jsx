import { useMemo } from 'react'

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
    return [...imgs].sort(() => Math.random() - 0.5)
  }, [picks])

  // each column gets all 6 images (different rotation) so no image repeats on screen
  // with 44vw cards (~171px on 390px phone), 6 cards = ~1026px > viewport height
  const left  = images
  const right = [...images.slice(3), ...images.slice(0, 3)]

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
