import { useMemo } from 'react'

// Two vertical columns, tilted -45°, scrolling opposite directions.
// Images repeated many times for seamless infinite loop at large frame size.
export default function Ticker({ picks, dim }) {
  const images = useMemo(() => {
    const imgs = [
      picks.theme?.img, picks.venue?.img, picks.entry?.img,
      picks.music?.img, picks.food?.img, picks.wildcard?.img,
    ].filter(Boolean)
    const shuffled = [...imgs].sort(() => Math.random() - 0.5)
    return { left: shuffled.slice(0, 3), right: shuffled.slice(3) }
  }, [picks])

  const repeat = (arr, times) => {
    const out = []
    for (let i = 0; i < times; i++) out.push(...arr)
    return out
  }

  const leftItems = repeat(images.left, 16)
  const rightItems = repeat(images.right, 16)

  return (
    <div className={`ticker-bg${dim ? ' ticker-bg-dim' : ''}`} aria-hidden="true">
      <div className="ticker-frame">
        <div className="ticker-col">
          <div className="ticker-track ticker-scroll-up">
            {leftItems.map((img, i) => (
              <div key={i} className="ticker-slot">
                <img src={`/assets/${img}.png`} alt="" draggable="false" />
              </div>
            ))}
          </div>
        </div>
        <div className="ticker-col">
          <div className="ticker-track ticker-scroll-down">
            {rightItems.map((img, i) => (
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
