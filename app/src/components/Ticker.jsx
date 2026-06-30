import { useMemo } from 'react'

// Single bottom row, all 6 images, tilted 8°, scrolls right.
// [A,B,C,D,E,F,A,B,C,D,E,F] — translateX(-50%) = exactly 6 card widths. Seamless.
export default function Ticker({ picks }) {
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

  return (
    <div className="ticker-bg" aria-hidden="true">
      <div className="ticker-row-wrap ticker-row-wrap-bottom">
        <div className="ticker-row ticker-scroll-right">
          {[...images, ...images].map((img, i) => (
            <div key={i} className="ticker-card">
              <img src={`/assets/${img}.png`} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
