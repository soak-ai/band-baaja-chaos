import { useMemo } from 'react'

// Two rows tilted at 8°: top scrolls left, bottom scrolls right.
// 3 images per row (6 total split across rows). Cards have no white background —
// transparent border-radius clips, cream padding blends with ticker bg.
export default function Ticker({ picks }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img, picks.venue?.img, picks.entry?.img,
      picks.music?.img, picks.food?.img, picks.wildcard?.img,
    ].filter(Boolean)
    // shuffle then split: first half top, second half bottom
    const shuffled = [...imgs].sort(() => Math.random() - 0.5)
    const mid = Math.ceil(shuffled.length / 2)
    return { top: shuffled.slice(0, mid), bottom: shuffled.slice(mid) }
  }, [picks])

  return (
    <div className="ticker-bg" aria-hidden="true">
      <div className="ticker-row-wrap ticker-row-wrap-top">
        <div className="ticker-row ticker-scroll-left">
          {[...images.top, ...images.top, ...images.top, ...images.top].map((img, i) => (
            <div key={i} className="ticker-card">
              <img src={`/assets/${img}.png`} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-row-wrap ticker-row-wrap-bottom">
        <div className="ticker-row ticker-scroll-right">
          {[...images.bottom, ...images.bottom, ...images.bottom, ...images.bottom].map((img, i) => (
            <div key={i} className="ticker-card">
              <img src={`/assets/${img}.png`} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
