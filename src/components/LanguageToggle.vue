<template>
  <button class="lang-toggle" @click="toggleLanguage">
    {{ currentLang === 'en' ? 'IT' : 'EN' }}
  </button>
</template>

<script setup lang="ts">
import { currentLang, toggleLanguage } from '../locales'
</script>

<style scoped>
.lang-toggle {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-muted);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  z-index: 10;
  transition: all 0.3s ease;
}

.lang-toggle:hover {
  color: var(--accent-gold);
  border-color: var(--accent-gold);
  box-shadow: 0 0 10px var(--accent-gold-glow);
}

@media (max-width: 900px) {
  .lang-toggle {
    top: 1rem;
    right: 1rem;
  }
}
</style>