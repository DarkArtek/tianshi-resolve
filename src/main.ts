import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { loadGTM, loadNoScript } from '@ahdcreative/gtm-core'

const app = createApp(App)

// Inserisci il tuo GTM ID qui
const GTM_ID = 'GTM-THDWQD7Q' 
const STORAGE_KEY = 'tianshi_cookie_consent'

// Funzione isolata per inizializzare il tracking
const initTracking = () => {
  const options = { id: GTM_ID, defer: true }
  loadGTM(options)
  loadNoScript(options)
  console.log('🔮 GTM Core loaded successfully')
}

// 1. Controllo al caricamento della pagina (per utenti di ritorno)
if (localStorage.getItem(STORAGE_KEY) === 'true' || localStorage.getItem(STORAGE_KEY) === 'granted') {
  initTracking()
}

// 2. Fallback per attivare GTM istantaneamente quando l'utente clicca sul tuo banner
// Intercettiamo il momento esatto in cui il banner salva il dato nel localStorage
const originalSetItem = localStorage.setItem
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, [key, value] as any)
  if (key === STORAGE_KEY && (value === 'true' || value === 'granted')) {
    initTracking()
  }
}
app.use(router)
app.mount('#app')