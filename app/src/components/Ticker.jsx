import { useMemo } from 'react'

// Two rows of card slots, entire frame rotated 15° clockwise so rows appear as
// diagonal bands. Top row scrolls left, bottom right. Seamless: each row renders
// [A,B,C,A,B,C] and translateX(-50%) = exactly 3 slot widths.
export default function Ticker({ picks, dim }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img, picks.venue?.img, picks.entry?.img,
      picks.music?.img, picks.food?.img, picks.wildcard?.img,
    ].filter(Boolean)
    const shuffled = [...imgs].sort(() => Math.random() - 0.5)
    // split 6 into top-3 / bottom-3
    return { top: shuffled.slice(0, 3), bottom: shuffled.slice(3) }
  }, [picks])

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-frame">
        {/* top row — scrolls left */}
        <div className="ticker-row-wrap">
          <div className="ticker-row ticker-scroll-left">
            {[...images.top, ...images.top].map((img, i) => (
              <div key={i} className="ticker-slot">
                <img src={`/assets/${img}.png`} alt="" draggable="false" />
              </div>
            ))}
          </div>
        </div>

        {/* bottom row — scrolls right */}
        <div className="ticker-row-wrap">
          <div className="ticker-row ticker-scroll-right">
            {[...images.bottom, ...images.bottom].map((img, i) => (
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
