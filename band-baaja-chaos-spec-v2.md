# Band Baaja Chaos — Product Spec v2 (build-ready)

A fake wedding-planning web app. The Wedding Simulator. You plan the most outrageous Indian wedding ever, end to end. None of it is real.

Thesis: simulators counterbalance extractive systems — live the fantasy, keep the savings. The app stays satire: the bill is always visible, always absurd, and nobody pays anything except vibes.

Design philosophy: THE MACHINE IS MODERN, THE CONTENT IS DESI. Interface = clean, editorial, premium. Desi-ness lives only in the illustrations, copy, and sounds.

---

## 1. Tech

- Static React + Vite site. No API, no database, no serverless functions.
- All copy hardcoded. All images pre-generated PNGs in /assets.
- Sounds: short royalty-free clips in /assets/sounds (shehnai sting, dhol build, dhol crash, soft tap).
- Host: Netlify or Cloudflare Pages. Add their built-in analytics (or one-line Plausible script) at deploy. No user data collected, ever.
- Mobile-first. Must look perfect at 390px width. Desktop = centered column, max-width ~480px.

## 2. Design system

Palette (from approved mood board):
- Warm cream (background): #FFF6E6
- Marigold: #F5A623
- Coral red (primary accent, buttons, headings): #FF4D4D
- Gold accent (thin rules, small details only): #D4AF37
- Ink dark (text): #1A1A1A

Type:
- Display: Rozha One (Google Fonts) — wordmark, level names, headlines, big numbers
- Body/UI: Instrument Sans (Google Fonts)

Case rules:
- Wordmark + level names: UPPERCASE display (Rozha One)
- Card names: Sentence case (e.g., "KJ core", "G-wagon", "Taj")
- Captions, buttons, microcopy: lowercase
- Proper nouns keep natural casing (WeWork, Ikea, DJ Jeetu, F1)

Signature details:
- Home headline has a slight tilt (~-2deg) — locked interaction detail
- Marigold pom-pom confetti on level transitions
- Cards: cream tiles, soft shadow, 16px radius. Selected = 2px coral/gold border + slight scale-up spring
- Guest list cards: no images, big Rozha numerals on cream tiles

## 3. Flow (one direction, no back buttons anywhere)

Splash → Home → Level 1 (Pakki baat) → transition → Level 2 (Bandobast) → transition → Level 3 (Shubh muhurat, auto) → Final card.

Back rules (the only law):
1. No back buttons exist anywhere.
2. Within a level: tap any card again to change your pick freely.
3. Crossed a level: it's locked.
4. Only restart: "start over" on the final card (full reset).

## 4. Screens & copy

### 4.1 Splash (auto, ~1.5s)
- Wordmark lockup: BAND BAAJA CHAOS / small caps subtitle: THE WEDDING SIMULATOR
- Microline: "wedding of the century, loading..."
- Loader: small marigold garland / phera circle animation. Auto-advance.

### 4.2 Home
- Headline (Rozha, tilted): "internet's biggest shaadi. your best decisions."
- Subline: "unlimited budget. zero consequences. log kya kahenge? let them."
- Button: "haan bol do"

### 4.3 Level 1 — PAKKI BAAT
Brief line under level name: "lock the basics. everything else is details."
3 rows, horizontal scroll each. First two cards fully visible, third peeks half-cut.
Caption slot: fixed height under each row. Empty before selection, caption fades in on tap. Zero layout shift.

Row: Theme (5)
1. The royals — "crowns. chandeliers. drama."
2. KJ core — "chiffon. wind machine. swiss, somehow."
3. Rewind — "shot on VHS. tinsel coded."
4. Pastel — "pinterest ki dulhan, in real life."
5. Mela — "the gaon wala met gala."

Row: Venue (5)
1. Taj — "mumtaz ka na sahi, tumhara sahi"
2. Terrace — "the whole society's watching."
3. Silk board — "traffic included"
4. Ikea — "mandap: assembly required"
5. WeWork — "9am standup, 7 pheras"

Row: Guest list (5, number tiles, no images)
1. 200 — "truly intimate."
2. 2,000 — "started at 200. oops."
3. 20,000 — "dad's entire contact list"
4. 2,00,000 — "basically a census."
5. 10,00,000 — "visible from space"

Continue button: starts grey/untappable, fills by one-third per row completed (visual fill, no text counter). When full: coral, label "pakki baat 🤝🏻", one gentle pop, tappable.

### 4.4 Transition L1 → L2
Shehnai sting + marigold pom-pom confetti burst.
Line 1: "shubh kaam mein deri kaisi?"
Stamp line: "BANDOBAST SHURU."

### 4.5 Level 2 — BANDOBAST
4 rows, same card pattern, gentle vertical scroll allowed. Burn meter stays pinned.

Row: Entry (5)
1. Ghodi — "the OG. iske bina kaise?"
2. Tractor — "punjabi aa gaye oye!"
3. G-wagon — "matte black desi convoy"
4. F1 — "pit stop at the mandap"
5. Chopper — "very K3G of you"

Row: Music (5)
1. DJ Jeetu — "takes requests. plays his own."
2. Diljit — "mid world tour. he'll manage."
3. Sabrina — "manchild, dedicated to the groom"
4. Zimmer — "your wedding, but cinema."
5. Coldplay — "goldplay. secure your wristbands first."

Row: Food (5)
1. Golgappa — "one more. always one more."
2. Gelato — "first course. last course. only course."
3. Draft — "beer on tap. unlimited refills."
4. Omakase — "chef decides. you flex."
5. Matcha — "a whole bar of it. green flag."

Row: Wildcard (4)
1. Paws — "plus-ones: furry only."
2. Merch — "hoodies + totes. limited wedding edition."
3. Drop — "guest-only sneakers. resale = rishta cancelled."
4. Typeface — "yours only. perfectly kerned."

Continue button: same fill mechanic, label when full: "sab booked 🤝🏻"

### 4.6 Burn cash meter (persistent, Levels 1–2 only)
- Horizontal track pinned at bottom, heats yellow → coral left to right.
- Needle marker: tiny folded ₹ note + small flame (approved reference image as art guide; build in code/SVG).
- Each selection nudges the needle right with an eased animation; bigger-ticket picks nudge further. Flame grows slightly as total climbs. Needle never reaches the end.
- ₹ counter ticks up beside it (rolling number animation).
- Every card has a hidden price (pick believable-absurd values; e.g., Taj ₹120 cr, Terrace ₹4,000, Chopper ₹3 cr, F1 ₹40 cr, guest counts scale by headcount). Exact values: Claude Code may generate, keeping totals landing between ₹50–500 crore for a typical run.

### 4.7 Level 3 — SHUBH MUHURAT (auto-playing, no taps, ~12–15s)
Full coral/cream theatrical screen. Kinetic typography only, no images, no card reuse.
Dhol build underneath, each beat lands on a hit:
- Beat 1: "it's happening."
- Beat 2: "{venue} packed. {guest count} showed up."  ← inserts the user's actual venue name + guest number
- Beat 3: "pheras happened anyway."
Dhol crash + shehnai flourish → final card bursts in with confetti.
All inserts read from user selections in state. Every combination must work.

### 4.8 Final card (the deliverable, built fully in code, modern editorial)
No ornate frame asset. Cream card, thin gold rules, small motif at most.
Layout top to bottom:
- Share icon, top-right corner
- Wordmark: BAND BAAJA CHAOS (small)
- Body line: "log kya kahenge?"
- Verdict line (by final total): under ₹100 cr → "surprisingly sensible. suspicious." / ₹100–250 cr → "tasteful chaos. certified." / over ₹250 cr → "menace of the season."
- "the highlights:" + the user's venue, music, guest count (e.g., "taj. goldplay. 2,00,000 guests.") — only 3 picks shown, mystery preserved
- BILL TOTAL: ₹{total} (big Rozha numerals)
- small line: "a number best left unread."
- PAID BY: vibes (vibes in italic)
- Button: "start over" (full reset)
Share behavior: Web Share API with link + line "i planned the internet's biggest shaadi. paid by vibes." Fallback: copy link. The card itself is the screenshot.

## 5. Sound map
- Card tap: soft tap
- L1→L2: shehnai sting
- L2→L3 / Level 3: dhol build → crash → shehnai flourish
- Sounds start only after first user tap (browser autoplay rules). Mute toggle: small icon, top corner, all screens.

## 6. Assets checklist (Akshita generates)
29 card illustrations, square PNG, one style. Prompt template:
"Modern flat illustration with subtle retro print grain: a single bold [OBJECT], simplified playful shapes, centered with generous empty space, warm cream background, vibrant palette of marigold orange, deep red, coral and gold, clean confident lines, premium and playful, not antique, not dark, no frame, no border, no text, square format."
Objects: turban / chiffon dupatta with peaks / VHS with garland / macaron tower / giant wheel · Taj dome / rooftop terrace with water tank / tangled traffic signals / flat-pack box with allen key / laptop on hot desk · decorated mare / decorated tractor / matte black SUV / F1 car with garland / helicopter with petals · DJ console with marigold / sequined jacket with mic / espresso martini / conductor baton on sheet music / glowing LED wristband · golgappa plate with pani bowls / gelato cup / beer tap with glass / omakase platter / matcha bowl with whisk · a golden retriever with a ring box / hoodie + tote / single premium sneaker / letterpress type blocks.
Sounds: shehnai sting, dhol build, dhol crash, soft tap (Pixabay/Mixkit, royalty-free).

## 7. Build order for Claude Code
1. Scaffold Vite + React, design tokens (colors, fonts, case rules), global styles
2. Splash + Home (tilted headline)
3. Card row component + caption slot + selection state
4. Burn meter component + price table + counter
5. Level 1 wired, continue-button fill mechanic
6. Transition component (confetti + lines + sound)
7. Level 2 wired
8. Level 3 kinetic type sequence with dynamic inserts
9. Final card + verdict logic + share
10. Sound manager + mute toggle, polish pass, deploy

## 8. Cut lines (if Sunday goes sideways)
- Sounds become optional (visual transitions still carry it)
- Any illustration that won't behave ships as a type-only card
- Level 3 drops to beats 1 and 3 only (never cut beat 3)

## 9. Parking lot (v2 / case study)
- Custom "add your own" input per category (deliberately deferred from v1)
- Obsession movie easter egg ("one wish. choose wisely.")
- Alt tagline available: "plan big. pay nothing. look legendary."
- Case study thesis: the Abhinav exchange (counterbalance vs exaggerate; satire via the absurd bill)
