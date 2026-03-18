<template>
  <header class="hero">
    <MagicDust />
    
    <div class="hero-content">
      <p class="subtitle">{{ t[currentLang].subtitle }}</p>
      <h1>The Tianshi's Resolve</h1>
      <p class="artist">{{ t[currentLang].artist }}</p>
      
      <div class="player-wrapper">
        <picture class="cover-picture">
          <source srcset="/optimized/cover.avif" type="image/avif">
          <source srcset="/optimized/cover.webp" type="image/webp">
          <img src="/raw-images/cover.png" alt="The Tianshi's Resolve Cover Art" class="cover-image">
        </picture>

        <div class="audio-controls-container">
          <audio 
            controls 
            controlsList="nodownload" 
            oncontextmenu="return false;"
            class="custom-audio"
          >
            <source src="https://tianshi-resolve.b-cdn.net/tianshi_resolve.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import MagicDust from './MagicDust.vue'
import { currentLang, t } from '../locales'
</script>

<style scoped>
.hero {
  position: relative;
  text-align: center;
  padding: 4rem 0;
  border-bottom: 1px solid rgba(45, 111, 94, 0.2);
  margin-bottom: 3rem;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.subtitle {
  color: var(--accent-jade);
  letter-spacing: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px var(--accent-jade-glow);
}

h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 0 20px var(--accent-jade-glow);
  line-height: 1.1;
}

.artist {
  color: var(--text-muted);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.player-wrapper {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--border-muted);
  background-color: #000;
  display: flex;
  flex-direction: column;
}

.cover-picture {
  width: 100%;
  display: block;
}

.cover-image {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.audio-controls-container {
  background-color: var(--bg-color);
  padding: 1rem;
  border-top: 1px solid var(--border-muted);
}

.custom-audio {
  width: 100%;
  height: 40px;
  outline: none;
  filter: invert(90%) sepia(20%) saturate(500%) hue-rotate(110deg) brightness(80%) contrast(120%);
}

.custom-audio:focus {
  outline: none;
}

@media (max-width: 900px) {
  .hero {
    padding: 3rem 0 2rem 0;
  }
  h1 { 
    font-size: 2.2rem; 
  }
  .artist {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
}
</style>