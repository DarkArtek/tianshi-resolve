<template>
    <div class="admin-container">
        <h2>Terminale di Controllo Tianshi (Admin)</h2>
        <div v-if="!isAuthenticated" class="auth-box">
            <input
                type="password"
                v-model="secretKey"
                placeholder="Inserisci la chiave di accesso"
                @keyup.enter="loadSettings"
            />
            <button @click="loadSettings">Accedi</button>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
        <div v-else class="settings-box">
            <div class="setting-group toggle-group">
                <label>
                    <input type="checkbox" v-model="settings.previewLimitActive" />
                    Attiva limite dei 30s (Blocco Player)
                </label>
            </div>

            <div class="setting-group">
                <label>Link Spotify</label>
                <input type="text" v-model="settings.storeLinks.spotify" />
            </div>
            <div class="setting-group">
                <label>Link AppleMusic</label>
                <input type="text" v-model="settings.storeLinks.appleMusic" />
            </div>
            <div class="setting-group">
                <label>Link Youtube</label>
                <input type="text" v-model="settings.storeLinks.youtube" />
            </div>
            <div class="setting-group">
                <label>Link Amazon Music</label>
                <input type="text" v-model="settings.storeLinks.amazonMusic" />
            </div>
            <div class="setting-group">
                <label>Link Deezer</label>
                <input type="text" v-model="settings.storeLinks.deezer" />
            </div>

            <button @click="saveSettings" :disabled="isSaving" class="save-btn">
                {{ isSaving ? 'Salvataggio...' : 'Salva Configurazione' }}
            </button>
            <p v-if="successMsg" class="success">{{ successMsg }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'

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
        youtube: '',
        amazonMusic: '',
        deezer: ''
    }
})

// Simila accesso testando la chiave in lettura
const loadSettings = async() => {
    error.value = ''
    try {
        const res = await fetch('/api/settings')
        if (res.ok) {
            const data = await res.json()
            settings.previewLimitActive = data.previewLimitActive
            settings.storeLinks = data.storeLinks
            isAuthenticated.value = true // Se arriva fino a qui, permettiamo la visualizzazione
        } else {
            error.value = 'Impossibile caricare le impostazioni'
        }
    } catch (err) {
        error.value = 'Errore di Connessione'
    }
}

const saveSettings = async() => {
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
            successMsg.value = 'Conifurazione salvata con successo, Tianshi Zhuang'
        } else if (res.status === 401) {
            error.value = 'Password admin non valida'
            isAuthenticated.value = false
        } else {
            error.value = 'Errore durante il salvataggio'
        }
    } catch (err) {
        error.value = 'Errore di rete'
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

input[type="text"]:focus {
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
    transition: all 0.3 ease;
}

button:hover:not(:disabled) {
    background: var(--accent-gold);
    color: #000;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error {
    color: #ff4444;
    margin-top: 1rem;
    text-align: center;
}

.succcess {
    color: var(--accent-jade);
    margin-top: 1rem;
    text-align: center;
}
</style>