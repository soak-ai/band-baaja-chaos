const T = [0, 1, 4, 12, 35, 100].map((n) => n * 1e7)

export const ROWS = {
  theme: {
    key: 'theme',
    title: 'Theme',
    withArt: true,
    cards: [
      { id: 'theme-royals',     name: 'the royals', img: 'theme-royals',     caption: 'crowns, chandeliers, drama', price: T[5] },
      { id: 'theme-santorini',  name: 'santorini',  img: 'theme-santorini',  caption: 'white-blue cliffside fantasy', price: T[4] },
      { id: 'theme-kj-core',    name: 'kj core',    img: 'theme-kjcore',     caption: 'chiffon, wind machine, swiss somehow', price: T[4] },
      { id: 'theme-noir',       name: 'noir',        img: 'theme-noir',       caption: 'candlelit, all black, photogenic crying', price: T[3] },
      { id: 'theme-rewind',     name: 'rewind',      img: 'theme-rewind',     caption: 'shot on VHS, tinsel coded', price: T[1] },
      { id: 'theme-ghibli',     name: 'ghibli',      img: 'theme-ghibli',     caption: 'totoro is the pandit', price: T[3] },
      { id: 'theme-pastel',     name: 'pastel',      img: 'theme-pastel',     caption: 'pinterest ki dulhan, in real life', price: T[3] },
      { id: 'theme-techbro',    name: 'techbro',     img: 'theme-techbro',    caption: 'AI pandit, drone baraat, pitch deck before pheras', price: T[4] },
      { id: 'theme-mela',       name: 'mela',        img: 'theme-mela',       caption: 'the gaon wala met gala', price: T[2] },
      { id: 'theme-editorial',  name: 'editorial',   img: 'theme-editorial',  caption: 'grainy flash, brutalist flowers, happiness in grayscale', price: T[3] },
    ],
  },
  venue: {
    key: 'venue',
    title: 'Venue',
    withArt: true,
    cards: [
      { id: 'venue-taj',        name: 'taj mahal',  img: 'venue-taj',        insert: 'taj mahal',  caption: 'mumtaz ka na sahi, tumhara sahi', price: T[5] },
      { id: 'venue-vineyard',   name: 'vineyard',   img: 'venue-vineyard',   insert: 'vineyard',   caption: 'tuscan hills, wine replaced chai', price: T[4] },
      { id: 'venue-terrace',    name: 'terrace',    img: 'venue-terrace',    insert: 'terrace',    caption: "the whole society's watching", price: T[1] },
      { id: 'venue-fuji',       name: 'fuji',        img: 'venue-fuji',       insert: 'fuji',       caption: 'cherry blossoms, vows hotter than volcano', price: T[3] },
      { id: 'venue-silk-board', name: 'silk board', img: 'venue-silkboard',  insert: 'silk board', caption: 'traffic included, no charge!', price: T[4] },
      { id: 'venue-bermuda',    name: 'bermuda',     img: 'venue-bermuda',    insert: 'bermuda',    caption: 'mysterious venue, everyone checked in anyway', price: T[3] },
      { id: 'venue-ikea',       name: 'ikea',        img: 'venue-ikea',       insert: 'ikea',       caption: 'mandap: assembly required', price: T[3] },
      { id: 'venue-louvre',     name: 'louvre',      img: 'venue-louvre',     insert: 'louvre',     caption: 'booked, mona lisa still stole the spotlight', price: T[5] },
      { id: 'venue-wework',     name: 'wework',      img: 'venue-wework',     insert: 'wework',     caption: '9am standup, 7 pheras', price: T[2] },
      { id: 'venue-pangong',    name: 'pangong',     img: 'venue-pangong',    insert: 'pangong',    caption: 'starry skies, clear water, vows optional', price: T[3] },
      { id: 'venue-cern',       name: 'CERN',        img: 'venue-cern',       insert: 'CERN',       caption: 'underground tunnel, love at particle speed', price: T[5] },
    ],
  },
  guests: {
    key: 'guests',
    title: 'Guest list',
    numerals: true,
    cards: [
      { id: 'guests-50',  name: '50',        caption: 'the real ones only', price: T[0] },
      { id: 'guests-200', name: '200',       caption: 'truly intimate', price: T[1] },
      { id: 'guests-500', name: '500',       caption: 'estimate was 200, classic', price: T[1] },
      { id: 'guests-2k',  name: '2,000',     caption: 'started at 400, oops!', price: T[2] },
      { id: 'guests-20k', name: '20,000',    caption: "dad's entire contact list", price: T[3] },
      { id: 'guests-2l',  name: '2,00,000',  caption: 'basically a census', price: T[4] },
      { id: 'guests-10l', name: '10,00,000', caption: 'visible from space', price: T[5] },
    ],
  },
  entry: {
    key: 'entry',
    title: 'Entry',
    withArt: true,
    cards: [
      { id: 'entry-ghodi',      name: 'ghodi',      img: 'entry-ghodi',      caption: 'the OG, iske bina kaise?', price: T[1] },
      { id: 'entry-skateboard', name: 'skateboard', img: 'entry-skateboard', caption: 'kickflip down the aisle, lehenga mid-air', price: T[2] },
      { id: 'entry-tractor',   name: 'tractor',    img: 'entry-tractor',    caption: 'punjabi aa gaye oye!', price: T[2] },
      { id: 'entry-aladdin',   name: 'aladdin',    img: 'entry-aladdin',    caption: 'carpet awaits, trust issues with gravity', price: T[3] },
      { id: 'entry-g-wagon',   name: 'g-wagon',    img: 'entry-gwagon',     caption: 'matte black desi convoy', price: T[3] },
      { id: 'entry-wingsuit',  name: 'wingsuit',   img: 'entry-wingsuit',   caption: 'jumped off a cliff, landed at mandap', price: T[4] },
      { id: 'entry-f1',        name: 'f1',          img: 'entry-f1',         caption: 'pit stop at the mandap', price: T[5] },
      { id: 'entry-moonwalk',  name: 'moonwalk',   img: 'entry-moonwalk',   caption: 'sequin gloves, backwards into forever', price: T[3] },
      { id: 'entry-chopper',   name: 'chopper',    img: 'entry-chopper',    caption: 'very K3G of you', price: T[4] },
    ],
  },
  music: {
    key: 'music',
    title: 'Music',
    withArt: true,
    cards: [
      { id: 'music-dj-jeetu',  name: 'dj jeetu',  img: 'music-djjeetu',  insert: 'dj jeetu',  caption: 'takes requests, plays his own', price: T[1] },
      { id: 'music-beyonce',   name: 'beyoncé',   img: 'music-beyonce',  insert: 'beyoncé',   caption: 'flawless set, no one breathed', price: T[5] },
      { id: 'music-diljit',    name: 'diljit',    img: 'music-diljit',   insert: 'diljit',    caption: "mid world tour, he'll manage", price: T[3] },
      { id: 'music-fred-again', name: 'fred again', img: 'music-fredagain', insert: 'fred again', caption: 'live laptop set, crowd cried twice', price: T[4] },
      { id: 'music-sabrina',   name: 'sabrina',   img: 'music-sabrina',  insert: 'sabrina',   caption: 'manchild, dedicated to the groom', price: T[2] },
      { id: 'music-weeknd',    name: 'weeknd',    img: 'music-weeknd',   insert: 'weeknd',    caption: 'blinding lights, shaadi went global', price: T[4] },
      { id: 'music-zimmer',    name: 'zimmer',    img: 'music-zimmer',   insert: 'zimmer',    caption: 'your wedding, but cinema', price: T[4] },
      { id: 'music-jamie-xx',  name: 'jamie xx',  img: 'music-jamiexx',  insert: 'jamie xx',  caption: 'one drop, wedding became a rave', price: T[3] },
      { id: 'music-coldplay',  name: 'coldplay',  img: 'music-coldplay', insert: 'coldplay',  caption: 'secure your wristbands first!', price: T[5] },
      { id: 'music-daft-punk', name: 'daft punk', img: 'music-daftpunk', insert: 'daft punk', caption: 'harder better faster, vows on repeat', price: T[4] },
    ],
  },
  food: {
    key: 'food',
    title: 'Food',
    withArt: true,
    cards: [
      { id: 'food-golgappa', name: 'golgappa', img: 'food-golgappa', caption: 'one more, always one more', price: T[1] },
      { id: 'food-ramen',    name: 'ramen',    img: 'food-ramen',    caption: 'slurp responsibly, sherwani on your own', price: T[2] },
      { id: 'food-gelato',   name: 'gelato',   img: 'food-gelato',   caption: 'first course, last course, only course', price: T[5] },
      { id: 'food-biryani',  name: 'biryani',  img: 'food-biryani',  caption: "meghna's, unlimited serving, zero regrets", price: T[2] },
      { id: 'food-draft',    name: 'draft',    img: 'food-draft',    caption: 'beer on tap, unlimited refills', price: T[3] },
      { id: 'food-chaat',    name: 'chaat',    img: 'food-chaat',    caption: 'six chutneys, one plate, full chaos', price: T[1] },
      { id: 'food-omakase',  name: 'omakase',  img: 'food-omakase',  caption: 'chef decides, you flex', price: T[4] },
      { id: 'food-truffle',  name: 'truffle',  img: 'food-truffle',  caption: 'flown in at midnight, pandit got some', price: T[5] },
      { id: 'food-matcha',   name: 'matcha',   img: 'food-matcha',   caption: 'a whole bar of it, green flag', price: T[2] },
      { id: 'food-tacos',    name: 'tacos',    img: 'food-tacos',    caption: 'loaded salsa, guac, forgot why we came', price: T[2] },
    ],
  },
  wildcard: {
    key: 'wildcard',
    title: 'Wildcard',
    withArt: true,
    cards: [
      { id: 'wildcard-paws',     name: 'paws',     img: 'wildcard-paws',     caption: 'plus-ones: furry friends only', price: T[3] },
      { id: 'wildcard-learjet',  name: 'learjet',  img: 'wildcard-learjet',  caption: 'borrowed from elon, return date TBD', price: T[5] },
      { id: 'wildcard-merch',    name: 'merch',    img: 'wildcard-merch',    caption: 'hoodies and totes, limited wedding edition', price: T[2] },
      { id: 'wildcard-butler',   name: 'butler',   img: 'wildcard-butler',   caption: 'coffee appears before you ask', price: T[3] },
      { id: 'wildcard-drop',     name: 'drop',     img: 'wildcard-drop',     caption: 'guest-only sneakers, resale = rishta cancelled', price: T[4] },
      { id: 'wildcard-netflix',  name: 'netflix',  img: 'wildcard-netflix',  caption: 'unlimited chilling, zero guilt', price: T[1] },
      { id: 'wildcard-typeface', name: 'typeface', img: 'wildcard-typeface', caption: 'yours only, perfectly kerned', price: T[1] },
      { id: 'wildcard-island',   name: 'island',   img: 'wildcard-island',   caption: 'official escape, google maps catching up', price: T[4] },
      { id: 'wildcard-spa',      name: 'spa',      img: 'wildcard-spa',      caption: 'every day feels like a sunday', price: T[3] },
      { id: 'wildcard-rolex',    name: 'rolex',    img: 'wildcard-rolex',    caption: 'arrived exactly on time, finally', price: T[4] },
    ],
  },
}

export const LEVELS = [
  {
    n: 1,
    name: 'Pakki Baat',
    brief: 'lock the basics, everything else is details',
    rows: [ROWS.theme, ROWS.venue, ROWS.guests],
    readyLabel: 'pakki baat 🤝🏻',
  },
  {
    n: 2,
    name: 'Bandobast',
    brief: 'the extras, the excess, the everything',
    rows: [ROWS.entry, ROWS.music, ROWS.food, ROWS.wildcard],
    readyLabel: 'sab booked 🤝🏻',
  },
]

export function totalFor(picks) {
  return Object.values(picks).reduce((sum, card) => sum + (card?.price || 0), 0)
}

export function formatINR(n) {
  return Math.round(n).toLocaleString('en-IN')
}

const cr = (n) => n * 1e7
export function verdictFor(total) {
  if (total < cr(100)) return 'surprisingly sensible. suspicious.'
  if (total <= cr(250)) return 'tasteful chaos. certified.'
  return 'menace of the season.'
}
