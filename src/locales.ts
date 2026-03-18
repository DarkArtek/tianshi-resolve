import { reactive, ref } from 'vue'

export type Language = 'en' | 'it'

export const currentLang = ref<Language>('en')

export const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'it' : 'en'
}

export const t = reactive({
  en: {
    subtitle: 'CELESTIAL ARCHIVES',
    artist: 'Featuring Ancient Arts & Modern Symphony',
    lyricsTitle: 'Lyrics Record',
    terminalTitle: 'Commune with the Arts',
    terminalPlaceholder: 'Ask about the ruins, the magic, or the song...',
    sendBtn: 'SEND',
    resonating: 'Resonating...',
    defaultTianshiReply: 'The ancient strings hum. What knowledge do you seek from the ruins?',
    listenOn: 'Stream & Download'
  },
  it: {
    subtitle: 'ARCHIVI CELESTI',
    artist: 'Antiche Arti e Sinfonia Moderna',
    lyricsTitle: 'Registro del Testo',
    terminalTitle: 'Comunica con le Arti',
    terminalPlaceholder: 'Chiedi delle rovine, della magia o del brano...',
    sendBtn: 'INVIA',
    resonating: 'In risonanza...',
    defaultTianshiReply: 'Le antiche corde vibrano. Quale conoscenza cerchi tra queste rovine?',
    listenOn: 'Ascolta e Scarica'
  }
})