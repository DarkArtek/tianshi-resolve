<template>
  <main class="immersive-terminal-page">
    <div class="terminal-wrapper">
      <TianshiTerminal />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TianshiTerminal from '../components/TianshiTerminal.vue'
import { currentLang } from '../locales'
import type { Language } from '../locales'

const route = useRoute()

// Leggiamo la lingua dall'URL in modo sincrono prima del render del componente
const langParam = route.params.lang as string

if (langParam === 'it' || langParam === 'en') {
  currentLang.value = langParam as Language
}
</script>

<style scoped>
.immersive-terminal-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  /* Un leggero bagliore di fondo per dare atmosfera */
  background: radial-gradient(circle at center, rgba(45, 111, 94, 0.05) 0%, #000 70%);
}

.terminal-wrapper {
  width: 100%;
  max-width: 800px;
}

/* Forziamo il terminale a riempire bene lo spazio senza margini strani della landing */
:deep(.interactive-section) {
  margin: 0;
  padding: 0;
}

:deep(h2) {
  text-align: center;
  border-left: none;
  padding-left: 0;
  text-shadow: 0 0 10px rgba(56, 229, 157, 0.3);
}

:deep(.terminal) {
  height: 70vh;
  min-height: 500px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(212, 175, 55, 0.1);
}
</style>