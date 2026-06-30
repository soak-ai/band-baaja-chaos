import { useState, useRef, useEffect } from 'react'
import Ticker from './Ticker'
import { formatINR, verdictFor } from '../data'

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, currentY)
      currentY += lineH
      line = word + ' '
    } else {
      line = test
    }
  }
  ctx.fillText(line.trim(), x, currentY)
  return currentY
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function generateCardBlob(total, verdict, highlights) {
  const W = 600, H = 700
  const R = 28
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.save()
  roundRect(ctx, 0, 0, W, H, R)
  ctx.clip()

  ctx.fillStyle = '#FFF9F0'
  ctx.fillRect(0, 0, W, H)

  const topGrad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 340)
  topGrad.addColorStop(0, 'rgba(245,166,35,0.10)')
  topGrad.addColorStop(1, 'rgba(245,166,35,0)')
  ctx.fillStyle = topGrad
  ctx.fillRect(0, 0, W, H)

  let marigold = null
  try { marigold = await loadImage('/assets/marigold-orange.png') } catch { /* skip */ }
  if (marigold) {
    const mSize = 130
    const offset = -mSize * 0.28
    ctx.save()
    ctx.globalAlpha = 0.12
    ctx.drawImage(marigold, offset, offset, mSize, mSize)
    ctx.save()
    ctx.translate(W, H)
    ctx.rotate(Math.PI)
    ctx.drawImage(marigold, offset, offset, mSize, mSize)
    ctx.restore()
    ctx.restore()
  }

  ctx.strokeStyle = 'rgba(212,175,55,0.55)'
  ctx.lineWidth = 2
  roundRect(ctx, 24, 24, W - 48, H - 48, 18)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(212,175,55,0.22)'
  ctx.lineWidth = 1
  roundRect(ctx, 32, 32, W - 64, H - 64, 12)
  ctx.stroke()

  ctx.restore()

  const ruleW = 260
  const rule = (y) => {
    ctx.strokeStyle = 'rgba(212,175,55,0.4)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - ruleW / 2, y)
    ctx.lineTo(W / 2 + ruleW / 2, y)
    ctx.stroke()
  }

  ctx.textAlign = 'center'

  // wordmark
  ctx.fillStyle = '#E87060'
  ctx.font = '500 20px Georgia, "Times New Roman", serif'
  ctx.letterSpacing = '4px'
  ctx.fillText('BAND BAAJA CHAOS', W / 2, 88)
  rule(104)

  // log kya kahenge?
  ctx.fillStyle = 'rgba(26,26,26,0.55)'
  ctx.font = '400 15px Georgia, serif'
  ctx.letterSpacing = '0'
  ctx.fillText('log kya kahenge?', W / 2, 134)

  // verdict
  ctx.fillStyle = '#1A1A1A'
  ctx.font = '400 28px Georgia, serif'
  wrapText(ctx, verdict, W / 2, 174, W - 140, 36)

  rule(242)

  // highlights
  ctx.fillStyle = 'rgba(26,26,26,0.42)'
  ctx.font = '500 11px system-ui, sans-serif'
  ctx.letterSpacing = '2px'
  ctx.fillText('THE HIGHLIGHTS', W / 2, 270)

  ctx.fillStyle = '#1A1A1A'
  ctx.font = '600 16px system-ui, sans-serif'
  ctx.letterSpacing = '0'
  wrapText(ctx, highlights + '.', W / 2, 296, W - 120, 24)

  rule(354)

  // bill total
  ctx.fillStyle = 'rgba(26,26,26,0.42)'
  ctx.font = '500 11px system-ui, sans-serif'
  ctx.letterSpacing = '2px'
  ctx.fillText('BILL TOTAL', W / 2, 382)

  ctx.fillStyle = '#E87060'
  ctx.font = '400 50px Georgia, serif'
  ctx.letterSpacing = '-1px'
  ctx.fillText('₹' + formatINR(total), W / 2, 446)

  ctx.fillStyle = 'rgba(26,26,26,0.42)'
  ctx.font = 'italic 400 13px Georgia, serif'
  ctx.letterSpacing = '0'
  ctx.fillText('a number best left unread.', W / 2, 472)

  rule(494)

  // paid by
  ctx.fillStyle = 'rgba(26,26,26,0.6)'
  ctx.font = '400 14px system-ui, sans-serif'
  ctx.letterSpacing = '1px'
  ctx.fillText('paid by: vibes 🧡', W / 2, 524)

  // url
  ctx.fillStyle = 'rgba(26,26,26,0.28)'
  ctx.font = '400 11px system-ui, sans-serif'
  ctx.letterSpacing = '0.5px'
  ctx.fillText('band-baaja-chaos.vercel.app', W / 2, H - 32)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export default function FinalCard({ picks, total, onRestart }) {
  const [toast, setToast] = useState('')
  const [cardVisible, setCardVisible] = useState(false)
  const cardRef = useRef(null)

  // show ticker first, reveal card after 3.5s
  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 6000)
    return () => clearTimeout(t)
  }, [])

  const highlights = [
    picks.venue?.insert,
    picks.music?.insert,
    picks.guests ? `${picks.guests.name} guests` : null,
  ]
    .filter(Boolean)
    .join('. ')

  const copyText = async (str) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(str)
        return true
      }
    } catch {
      /* fall through */
    }
    try {
      const ta = document.createElement('textarea')
      ta.value = str
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }

  const share = async () => {
    const url = 'https://band-baaja-chaos.vercel.app/'
    const text = `It started as a harmless little wedding-planning fantasy.\n\nIt ended at *₹${formatINR(total)}*\n\nPaid by: vibes 🧡\n\nPlan yours: ${url}`

    if (navigator.share && cardRef.current) {
      try {
        const h2c = (await import('html2canvas')).default
        const shareBtn = cardRef.current.querySelector('.share-btn')
        if (shareBtn) shareBtn.style.visibility = 'hidden'
        const canvas = await h2c(cardRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: window.devicePixelRatio || 2,
        })
        if (shareBtn) shareBtn.style.visibility = ''
        const blob = await new Promise(r => canvas.toBlob(r, 'image/png'))
        const file = new File([blob], 'band-baaja-chaos.png', { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: 'Band Baaja Chaos', files: [file], text })
          return
        }
        await navigator.share({ title: 'Band Baaja Chaos', text })
        return
      } catch (err) {
        const shareBtn = cardRef.current?.querySelector('.share-btn')
        if (shareBtn) shareBtn.style.visibility = ''
        if (err && err.name === 'AbortError') return
      }
    }
    const ok = await copyText(text)
    setToast(ok ? 'copied ✓' : 'sharing not supported here')
    setTimeout(() => setToast(''), 2200)
  }

  return (
    <main className="screen final">
      <Ticker picks={picks} dim={cardVisible} />
      {cardVisible && (
        <>
          <div className="final-card final-card-reveal" ref={cardRef}>
            <span className="final-motif final-motif-tl" aria-hidden="true" />
            <span className="final-motif final-motif-br" aria-hidden="true" />

            <button className="share-btn" onClick={share} aria-label="share">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="M7.5 7.5 12 3l4.5 4.5" />
                <path d="M5 13v6a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6" />
              </svg>
            </button>

            <p className="final-wordmark">BAND BAAJA CHAOS</p>
            <hr className="gold-rule" />
            <p className="final-body">log kya kahenge?</p>
            <p className="final-verdict">{verdictFor(total)}</p>

            <p className="final-label">the highlights</p>
            <p className="final-highlights">{highlights}.</p>

            <hr className="gold-rule" />
            <p className="final-label">bill total</p>
            <p className="final-total">₹{formatINR(total)}</p>
            <p className="final-small">a number best left unread.</p>

            <hr className="gold-rule" />
            <p className="final-paidby">
              paid by: <em>vibes</em>
            </p>
          </div>

          {toast && <p className="copy-toast">{toast}</p>}

          <button className="glass-btn glass-btn-ready final-restart-btn" onClick={onRestart}>
            start over
          </button>
        </>
      )}
    </main>
  )
}
