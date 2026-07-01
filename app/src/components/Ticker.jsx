import { useMemo } from 'react'

// Dense diagonal grid: many rows stacked tightly, alternating scroll direction,
// filling the entire screen edge-to-edge when rotated 15°.
export default function Ticker({ picks, dim }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img, picks.venue?.img, picks.entry?.img,
      picks.music?.img, picks.food?.img, picks.wildcard?.img,
    ].filter(Boolean)
    return [...imgs].sort(() => Math.random() - 0.5)
  }, [picks])

  // Build 6 rows alternating direction. Each row uses all 6 images repeated
  // for seamless looping, but offset the starting image per row for variety.
  const rows = useMemo(() => (
    Array.from({ length: 6 }, (_, i) => {
      const offset = i % images.length
      const shifted = [...images.slice(offset), ...images.slice(0, offset)]
      return {
        dir: i % 2 === 0 ? 'left' : 'right',
        imgs: [...shifted, ...shifted],
      }
    })
  ), [images])

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-frame">
        {rows.map((row, ri) => (
          <div key={ri} className="ticker-row-wrap">
            <div className={`ticker-row ticker-scroll-${row.dir}`}>
              {row.imgs.map((img, i) => (
                <div key={i} className="ticker-slot">
                  <img src={`/assets/${img}.png`} alt="" draggable="false" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
