import { useState, useEffect } from 'react'
import { LEVELS, totalFor } from './data'
import { sound } from './sound'
import Splash from './components/Splash'
import Home from './components/Home'
import Level from './components/Level'
import Transition from './components/Transition'
import Level3 from './components/Level3'
import FinalCard from './components/FinalCard'
import MuteToggle from './components/MuteToggle'

// one direction, no back buttons anywhere.
// splash → home → level1 → transition → level2 → level3 (auto) → final
export default function App() {
  const [stage, setStage] = useState('splash')
  const [picks, setPicks] = useState({})

  // kick off all card image downloads during splash so they're cached by Level 1
  useEffect(() => {
    const names = [
      'theme-royals','theme-kjcore','theme-rewind','theme-pastel','theme-mela',
      'theme-santorini','theme-noir','theme-ghibli','theme-techbro','theme-editorial',
      'venue-taj','venue-terrace','venue-silkboard','venue-ikea','venue-wework',
      'venue-vineyard','venue-fuji','venue-bermuda','venue-louvre','venue-pangong','venue-cern',
      'entry-ghodi','entry-tractor','entry-gwagon','entry-f1','entry-chopper',
      'entry-skateboard','entry-aladdin','entry-wingsuit','entry-moonwalk',
      'music-djjeetu','music-diljit','music-sabrina','music-zimmer','music-coldplay',
      'music-beyonce','music-fredagain','music-weeknd','music-jamiexx','music-daftpunk',
      'food-golgappa','food-gelato','food-draft','food-omakase','food-matcha',
      'food-ramen','food-biryani','food-chaat','food-truffle','food-tacos',
      'wildcard-paws','wildcard-merch','wildcard-drop','wildcard-typeface',
      'wildcard-learjet','wildcard-butler','wildcard-netflix','wildcard-island','wildcard-spa','wildcard-rolex',
      'marigold-pink','marigold-orange','marigold-yellow',
    ]
    names.forEach((n) => { new Image().src = `/assets/${n}.png` })
  }, [])

  const total = totalFor(picks)

  const select = (rowKey, card) => {
    sound.play('tap')
    setPicks((p) => ({ ...p, [rowKey]: card }))
  }

  const reset = () => {
    setPicks({})
    setStage('home')
  }

  return (
    <div className="frame">
      <MuteToggle hidden={stage === 'splash'} />
      {stage === 'splash' && <Splash onDone={() => setStage('home')} />}
      {stage === 'home' && <Home onStart={() => setStage('level1')} />}
      {stage === 'level1' && (
        <Level
          level={LEVELS[0]}
          picks={picks}
          total={total}
          onSelect={select}
          onContinue={() => setStage('transition1')}
        />
      )}
      {stage === 'transition1' && <Transition onDone={() => setStage('level2')} />}
      {stage === 'level2' && (
        <Level
          level={LEVELS[1]}
          picks={picks}
          total={total}
          onSelect={select}
          onContinue={() => setStage('level3')}
        />
      )}
      {stage === 'level3' && <Level3 picks={picks} onDone={() => setStage('final')} />}
      {stage === 'final' && <FinalCard picks={picks} total={total} onRestart={reset} />}
    </div>
  )
}
