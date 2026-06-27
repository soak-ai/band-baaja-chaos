import { useState } from 'react'
import { formatINR } from '../data'

function CardArt({ img, artScale }) {
  const [missing, setMissing] = useState(!img)
  if (missing) return <div className="card-img card-img-empty" aria-hidden="true" />
  return (
    <img
      className="card-img"
      style={{ '--art-scale': artScale || 1.05 }}
      src={`/assets/${img}.png`}
      alt=""
      onError={() => setMissing(true)}
    />
  )
}

function FloatingPrice({ price, x, y }) {
  return (
    <div
      className="floating-price"
      style={{ '--start-x': `${x}px`, '--start-y': `${y}px` }}
      aria-hidden="true"
    >
      ₹{formatINR(price)}
    </div>
  )
}

export default function CardRow({ row, selected, onSelect }) {
  const veiled = row.key === 'wildcard'
  const [revealedId, setRevealedId] = useState(null)
  const [hintDone, setHintDone] = useState(false)
  const [swappingId, setSwappingId] = useState(null)
  const [swapReveal, setSwapReveal] = useState(false)
  const [closingIds, setClosingIds] = useState(new Set())
  const [floatingPrices, setFloatingPrices] = useState([])

  return (
    <section className="row">
      <h3 className="row-title">
        {row.title}
        {veiled && !hintDone && !selected && (
          <span className="wildcard-hint">( tap to peek )</span>
        )}
      </h3>
      <div className="row-scroll">
        {row.cards.map((card, i) => {
          const isSelected = selected?.id === card.id
          const isVeiled = veiled && revealedId !== card.id && !isSelected

          let drapeVars = {}
          if (veiled) {
            if (card.id === swappingId) {
              drapeVars = { '--drape-dur': '0.9s', '--drape-ease': 'ease-in-out' }
            } else if (card.id === revealedId && swapReveal) {
              drapeVars = { '--drape-dur': '0.9s', '--drape-ease': 'ease-in-out' }
            } else if (closingIds.has(card.id)) {
              drapeVars = { '--drape-dur': '0.6s', '--drape-ease': 'ease-out' }
            }
          }

          const handle = (e) => {
            // Trigger price animation only for theme category (test)
            // Floating price animation (theme test)
            if (row.key === 'theme') {
              const rect = e.currentTarget.getBoundingClientRect()
              const cardCenterX = rect.left + rect.width / 2
              const aboveCardY = rect.top - 11 // Clear gap above card border (text height + 2px buffer)

              const floatId = `${card.id}-${Date.now()}`
              setFloatingPrices(prev => [...prev, { id: floatId, x: cardCenterX, y: aboveCardY, price: card.price }])
              setTimeout(() => {
                setFloatingPrices(prev => prev.filter(f => f.id !== floatId))
              }, 1000)
            }

            if (veiled) {
              if (isVeiled) {
                if (revealedId) {
                  // swap: A re-veils, B lifts — both 0.9s ease-in-out
                  setSwappingId(revealedId)
                  setSwapReveal(true)
                  setRevealedId(card.id)
                  setHintDone(true)
                  setTimeout(() => {
                    setSwappingId(null)
                    setSwapReveal(false)
                  }, 900)
                } else {
                  // first reveal — default 1.4s warm ease
                  setRevealedId(card.id)
                  setHintDone(true)
                }
              } else {
                // tap revealed card → select it, re-veil all others 0.6s
                const others = new Set(row.cards.filter(c => c.id !== card.id).map(c => c.id))
                setClosingIds(others)
                setTimeout(() => setClosingIds(new Set()), 600)
                onSelect(row.key, card)
                setRevealedId(null)
              }
              return
            }
            onSelect(row.key, card)
          }

          return (
            <button
              key={card.id}
              className={`art-card${isSelected ? ' art-card-selected' : ''}`}
              style={{ '--i': i }}
              onClick={handle}
              aria-pressed={isSelected}
            >
              <div className="art-card-media">
                {row.numerals ? (
                  <span className="art-card-num">{card.name}</span>
                ) : (
                  <CardArt img={card.img} artScale={card.artScale} />
                )}
                {veiled && (
                  <div
                    className={`card-drape${isVeiled ? '' : ' card-drape-lifted'}`}
                    style={drapeVars}
                    aria-hidden="true"
                  >
                    <span className="card-drape-q">?</span>
                  </div>
                )}
              </div>
              <span className="art-card-name">{row.numerals ? '' : card.name}</span>
              <span className="art-card-caption">{isSelected ? card.caption : ''}</span>
            </button>
          )
        })}
        {floatingPrices.map(float => (
          <FloatingPrice key={float.id} price={float.price} x={float.x} y={float.y} />
        ))}
      </div>
    </section>
  )
}
