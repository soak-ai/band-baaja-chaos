import { useMemo } from 'react'

// Two horizontal rows tilted ~8° as one diagonal belt.
// Row 1 scrolls left, row 2 scrolls right.
// 3 images per row, seamless loop via [A,B,C,A,B,C] + translateX(-50%).
// margin-right on cards (not gap on row) keeps the -50% loop point exact.
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

  const row1 = images.slice(0, 3)
  const row2 = images.slice(3, 6)

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-row-wrap ticker-row-wrap-top">
        <div className="ticker-row ticker-scroll-left">
          {[...row1, ...row1].map((img, i) => (
            <div key={i} className="ticker-card">
              <img src={`/assets/${img}.png`} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-row-wrap ticker-row-wrap-bottom">
        <div className="ticker-row ticker-scroll-right">
          {[...row2, ...row2].map((img, i) => (
            <div key={i} className="ticker-card">
              <img src={`/assets/${img}.png`} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
