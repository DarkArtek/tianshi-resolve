<template>
  <section class="interactive-section">
    <h2>{{ t[currentLang].terminalTitle }}</h2>
    <div class="terminal">
      <div class="terminal-output" ref="terminalOutput">
        <div v-for="(msg, index) in chatMessages" :key="index" :class="['message', msg.role]">
          <span class="prefix">{{ msg.role === 'user' ? 'GUEST >' : 'TIANSHI >' }}</span>
          <span class="text">{{ msg.text }}</span>
        </div>
        <div v-if="isLoading" class="message tianshi">
          <span class="prefix">TIANSHI ></span>
          <span class="text typing-indicator">{{ t[currentLang].resonating }}</span>
        </div>
      </div>
      <form @submit.prevent="askGemini" class="terminal-input-group">
        <span class="prefix">GUEST ></span>
        <input 
          v-model="userInput" 
          type="text" 
          :placeholder="t[currentLang].terminalPlaceholder" 
          :disabled="isLoading"
        />
        <button type="submit" :disabled="isLoading || !userInput.trim()">{{ t[currentLang].sendBtn }}</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { pushToDataLayer } from '@ahdcreative/gtm-core'
import { currentLang, t } from '../locales'

interface ChatMessage {
  role: 'user' | 'tianshi'
  text: string
}

const userInput = ref('')
const isLoading = ref(false)
const terminalOutput = ref<HTMLElement | null>(null)
const chatMessages = ref<ChatMessage[]>([
  { role: 'tianshi', text: t[currentLang.value].defaultTianshiReply }
])

const askGemini = async () => {
  const text = userInput.value.trim()
  if (!text) return

  chatMessages.value.push({ role: 'user', text })
  userInput.value = ''
  isLoading.value = true
  scrollToBottom()

  pushToDataLayer({
    event: 'terminal_interaction',
    terminal: {
      action: 'ask_question',
      language: currentLang.value
    }
  })

  try {
    const prompt = `Sei Zhuang Fangyi, una Tianshi, studiosa delle Arti Antiche e vice-re di Wuling. Stai rispondendo a un viandante che ascolta la tua canzone "The Tianshi's Resolve". Rispondi in massimo 3 frasi, usando un tono epico, misterioso e poetico. La domanda è: "${text}"`
    
    // Chiamata sicura alla nostra API serverless su Cloudflare
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Le Arti sono silenziose oggi.'
    
    chatMessages.value.push({ role: 'tianshi', text: replyText })
  } catch (error) {
    console.error('Error calling Server API:', error)
    chatMessages.value.push({ role: 'tianshi', text: '[System Error] Connection to the Ancient Arts severed.' })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (terminalOutput.value) {
    terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
  }
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent-jade);
  border-left: 4px solid var(--accent-jade);
  padding-left: 1rem;
}

.terminal {
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--border-muted);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 600px;
  font-family: monospace;
}

.terminal-output {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 0.5rem;
  line-height: 1.4;
}

.message.user .prefix { color: #4ade80; }
.message.tianshi .prefix { color: var(--accent-gold); }
.message.tianshi .text { color: #e2e2e2; }

.terminal-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-top: 1px dashed var(--border-muted);
  padding-top: 1rem;
}

input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: white;
  font-family: monospace;
  font-size: 1rem;
  outline: none;
}

button {
  background: var(--accent-gold);
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  background: white;
}

.typing-indicator {
  color: var(--accent-gold);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 900px) {
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .terminal {
    height: 450px;
    padding: 1rem;
  }
  .terminal-input-group {
    flex-wrap: wrap; 
  }
  input {
    font-size: 16px; 
    width: 100%;
  }
}
</style>