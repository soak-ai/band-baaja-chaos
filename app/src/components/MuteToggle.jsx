import { useState } from 'react'
import { sound } from '../sound'

export default function MuteToggle({ hidden }) {
  const [muted, setMuted] = useState(sound.muted)
  if (hidden) return null

  const toggle = () => {
    const next = !muted
    setMuted(next)
    sound.setMuted(next)
  }

  return (
    <button className="mute-toggle" onClick={toggle} aria-label={muted ? 'unmute' : 'mute'}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
        {muted ? (
          <>
            <path d="M16 9.5 21 14.5" />
            <path d="M21 9.5 16 14.5" />
          </>
        ) : (
          <>
            <path d="M15.5 9.5a4 4 0 0 1 0 5" />
            <path d="M18 7.5a7.5 7.5 0 0 1 0 9" />
          </>
        )}
      </svg>
    </button>
  )
}
