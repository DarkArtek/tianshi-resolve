<template>
  <main class="landing-container">
    <LanguageToggle />
    
    <HeroSection />

    <StoreLinks />

    <div class="content-grid">
      <LyricsBoard />
      <TianshiTerminal />
    </div>

    <CookieBanner 
      :locale="currentLang" 
      theme="dark-lime" 
      storageName="tianshi_cookie_consent"
    />
  </main>
</template>

<script setup lang="ts">
import LanguageToggle from './components/LanguageToggle.vue'
import HeroSection from './components/HeroSection.vue'
import StoreLinks from './components/StoreLinks.vue'
import LyricsBoard from './components/LyricsBoard.vue'
import TianshiTerminal from './components/TianshiTerminal.vue'
import { CookieBanner } from '@ahdcreative/cookie-banner'
import '@ahdcreative/cookie-banner/dist/style.css'
import { currentLang } from './locales'
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

/* Ottimizzazione Mobile */
@media (max-width: 900px) {
  .landing-container {
    padding: 1rem;
  }
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>