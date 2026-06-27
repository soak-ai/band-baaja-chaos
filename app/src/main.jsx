import ReactDOM from 'react-dom/client'
import App from './App'
import { sound } from './sound'
import './styles.css'

// browsers only allow audio after a user gesture
window.addEventListener('pointerdown', () => sound.init(), { once: true })

const container = document.getElementById('root')

// Single React root, kept on `window` so Vite HMR REUSES it instead of
// silently creating a second root (which would render the tree twice and
// produce the ghosted second-screen artifact the user has been seeing).
const root = window.__bbcRoot || ReactDOM.createRoot(container)
window.__bbcRoot = root
root.render(<App />)

if (import.meta.hot) {
  // accept this module so HMR replays render() instead of doing a full reload,
  // and clear any leftover render layers when the module is disposed.
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    // best-effort: don't unmount, just signal the next render to fully replace.
    container.dataset.hmr = String((+container.dataset.hmr || 0) + 1)
  })
}
