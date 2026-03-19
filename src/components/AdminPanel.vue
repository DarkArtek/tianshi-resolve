<template>
  <div class="admin-container">
    <h2>Terminale di Controllo (Admin)</h2>
    
    <form v-if="!isAuthenticated" class="auth-box" @submit.prevent="loadSettings">
      <input 
        type="password" 
        v-model="secretKey" 
        placeholder="Inserisci Chiave di Accesso" 
      />
      <button type="submit">Accedi</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <div v-else class="settings-box">
      <div class="setting-group toggle-group">
        <label>
          <input type="checkbox" v-model="settings.previewLimitActive" />
          Attiva Limite 30 Secondi (Blocco Player)
        </label>
      </div>

      <div class="setting-group">
        <label>Link Spotify</label>
        <input type="text" v-model="settings.storeLinks.spotify" />
      </div>

      <div class="setting-group">
        <label>Link Apple Music</label>
        <input type="text" v-model="settings.storeLinks.appleMusic" />
      </div>

      <div class="setting-group">
        <label>Link Amazon Music</label>
        <input type="text" v-model="settings.storeLinks.amazonMusic" />
      </div>

      <div class="setting-group">
        <label>Link YouTube</label>
        <input type="text" v-model="settings.storeLinks.youtube" />
      </div>

      <div class="setting-group">
        <label>Link Deezer</label>
        <input type="text" v-model="settings.storeLinks.deezer" />
      </div>

      <button @click="saveSettings" :disabled="isSaving" class="save-btn">
        {{ isSaving ? 'Salvataggio...' : 'Salva Configurazione' }}
      </button>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const secretKey = ref('')
const isAuthenticated = ref(false)
const isSaving = ref(false)
const error = ref('')
const successMsg = ref('')

const settings = reactive({
  previewLimitActive: false,
  storeLinks: {
    spotify: '',
    appleMusic: '',
    amazonMusic: '',
    youtube: '',
    deezer: ''
  }
})

const loadSettings = async () => {
  error.value = ''
  try {
    const res = await fetch('/api/settings')
    if (res.ok) {
      const data = await res.json()
      settings.previewLimitActive = data.previewLimitActive
      settings.storeLinks = { ...settings.storeLinks, ...data.storeLinks }
      isAuthenticated.value = true
    } else {
      error.value = 'Impossibile caricare le impostazioni dal server.'
    }
  } catch (err) {
    error.value = 'Errore di connessione al database KV.'
  }
}

const saveSettings = async () => {
  isSaving.value = true
  successMsg.value = ''
  error.value = ''
  
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey.value}`
      },
      body: JSON.stringify(settings)
    })

    if (res.ok) {
      successMsg.value = 'Configurazione salvata con successo e live!'
    } else {
      // Catturiamo l'errore dettagliato dal nostro backend
      const errData = await res.json().catch(() => ({}))
      
      if (res.status === 401) {
        error.value = errData.dettaglio || 'Password Admin non valida!'
        isAuthenticated.value = false
      } else {
        error.value = errData.error || 'Errore critico durante il salvataggio'
      }
    }
  } catch (err) {
    error.value = 'Errore di rete fatale.'
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid var(--accent-gold);
  border-radius: 8px;
  color: #fff;
}

h2 {
  color: var(--accent-gold);
  margin-bottom: 2rem;
  text-align: center;
}

.setting-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.setting-group label {
  margin-bottom: 0.5rem;
  color: var(--accent-jade);
}

input[type="text"], input[type="password"] {
  padding: 0.8rem;
  background: #000;
  border: 1px solid var(--border-muted);
  color: #fff;
  border-radius: 4px;
}

input[type="text"]:focus, input[type="password"]:focus {
  border-color: var(--accent-gold);
  outline: none;
}

.toggle-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
}

button {
  width: 100%;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.1);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  background: var(--accent-gold);
  color: #000;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error { color: #ff4444; margin-top: 1rem; text-align: center; font-weight: bold; }
.success { color: var(--accent-jade); margin-top: 1rem; text-align: center; font-weight: bold; }
</style>