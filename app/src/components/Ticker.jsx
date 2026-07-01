import { useMemo } from 'react'

// Two vertical columns side by side, tilted 15°.
// Left column scrolls UP, right column scrolls DOWN.
// 3 images per column, cloned for seamless loop.
export default function Ticker({ picks, dim }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img, picks.venue?.img, picks.entry?.img,
      picks.music?.img, picks.food?.img, picks.wildcard?.img,
    ].filter(Boolean)
    const shuffled = [...imgs].sort(() => Math.random() - 0.5)
    return { left: shuffled.slice(0, 3), right: shuffled.slice(3) }
  }, [picks])

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-frame">
        <div className="ticker-col">
          <div className="ticker-track ticker-scroll-up">
            {[...images.left, ...images.left].map((img, i) => (
              <div key={i} className="ticker-slot">
                <img src={`/assets/${img}.png`} alt="" draggable="false" />
              </div>
            ))}
          </div>
        </div>
        <div className="ticker-col">
          <div className="ticker-track ticker-scroll-down">
            {[...images.right, ...images.right].map((img, i) => (
              <div key={i} className="ticker-slot">
                <img src={`/assets/${img}.png`} alt="" draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
