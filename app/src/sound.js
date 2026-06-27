// sound manager. real clips dropped into /public/assets/sounds/ are used
// automatically; until then each cue falls back to a small WebAudio sketch
// so timing and feel can be tuned before the final files exist.
const FILES = {
  tap: '/assets/sounds/tap.mp3',
  shehnai: '/assets/sounds/shehnai.mp3',
  dhol: '/assets/sounds/dhol.mp3',
  'dhol-build': '/assets/sounds/dhol-build.mp3',
  'dhol-crash': '/assets/sounds/dhol-crash.mp3',
}

class Sound {
  constructor() {
    this.ctx = null
    this.master = null
    this.muted = false
    this.buffers = {}
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      return
    }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 1
    this.master.connect(this.ctx.destination)
    this.loadFiles()
  }

  async loadFiles() {
    for (const [name, url] of Object.entries(FILES)) {
      try {
        const res = await fetch(url)
        if (!res.ok) continue
        const buf = await res.arrayBuffer()
        this.buffers[name] = await this.ctx.decodeAudioData(buf)
      } catch {
        // missing or undecodable file → synth fallback stays in place
      }
    }
  }

  setMuted(m) {
    this.muted = m
    if (this.master) this.master.gain.value = m ? 0 : 1
  }

  // play the first `seconds` of a clip at `volume` (0–1) with a fade-in and a
  // long fade-out (`fade` seconds) so it never starts or ends abruptly
  playClip(name, seconds, volume = 1, fade = 1.6) {
    if (!this.ctx || this.muted) return
    const buf = this.buffers[name]
    if (!buf) {
      // fallback so transitions still have audio before the real file loads
      if (name === 'dhol') this.synthDholBuild(seconds)
      return
    }
    const src = this.ctx.createBufferSource()
    src.buffer = buf
    const g = this.ctx.createGain()
    src.connect(g)
    g.connect(this.master)
    const now = this.ctx.currentTime
    src.start(now)
    // quick fade-in
    g.gain.setValueAtTime(0.001, now)
    g.gain.exponentialRampToValueAtTime(volume, now + 0.25)
    // gentle, long fade-out
    g.gain.setValueAtTime(volume, now + Math.max(0.3, seconds - fade))
    g.gain.exponentialRampToValueAtTime(0.001, now + seconds)
    src.stop(now + seconds + 0.05)
  }

  play(name) {
    if (!this.ctx || this.muted) return
    if (this.buffers[name]) {
      const src = this.ctx.createBufferSource()
      src.buffer = this.buffers[name]
      src.connect(this.master)
      src.start()
      return
    }
    if (name === 'tap') this.synthTap()
    else if (name === 'shehnai') this.synthShehnai()
    else if (name === 'dhol-build') this.synthDholBuild(9.5)
    else if (name === 'dhol-crash') this.synthDholCrash()
  }

  tone({ type = 'sine', freq = 440, to = null, time = 0, dur = 0.2, gain = 0.15 }) {
    const t = this.ctx.currentTime + time
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    osc.connect(g)
    g.connect(this.master)
    osc.start(t)
    osc.stop(t + dur + 0.05)
  }

  synthTap() {
    this.tone({ type: 'triangle', freq: 560, to: 440, dur: 0.07, gain: 0.12 })
  }

  synthShehnai() {
    // little reedy upward sting
    this.tone({ type: 'sawtooth', freq: 740, to: 988, time: 0, dur: 0.28, gain: 0.06 })
    this.tone({ type: 'sawtooth', freq: 988, to: 880, time: 0.28, dur: 0.5, gain: 0.06 })
    this.tone({ type: 'sine', freq: 1480, to: 1760, time: 0.05, dur: 0.5, gain: 0.025 })
  }

  thump(time, gain = 0.5) {
    this.tone({ type: 'sine', freq: 150, to: 55, time, dur: 0.18, gain })
  }

  synthDholBuild(duration) {
    // accelerating dhol thumps
    let t = 0
    let gap = 0.55
    while (t < duration) {
      this.thump(t, 0.35 + 0.25 * (t / duration))
      t += gap
      gap = Math.max(0.13, gap * 0.92)
    }
  }

  synthDholCrash() {
    this.thump(0, 0.8)
    this.thump(0.05, 0.7)
    // shehnai flourish on top
    this.tone({ type: 'sawtooth', freq: 660, to: 1320, time: 0.1, dur: 0.6, gain: 0.06 })
    this.tone({ type: 'sine', freq: 1320, to: 1760, time: 0.5, dur: 0.7, gain: 0.03 })
  }
}

export const sound = new Sound()
