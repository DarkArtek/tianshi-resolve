<template>
  <header class="hero">
    <MagicDust />
    
    <div class="hero-content">
      <p class="subtitle">{{ t[currentLang].subtitle }}</p>
      <h1>The Tianshi's Resolve</h1>
      <p class="artist">{{ t[currentLang].artist }}</p>
      
      <div class="player-wrapper">
        <picture class="cover-picture">
          <source :srcset="'/optimized/cover.avif'" type="image/avif">
          <source :srcset="'/optimized/cover.webp'" type="image/webp">
          <img :src="'/raw-images/cover.jpg'" alt="The Tianshi's Resolve Cover Art" class="cover-image">
        </picture>

        <div class="audio-controls-container">
          <audio 
            ref="audioRef"
            controls 
            controlsList="nodownload" 
            oncontextmenu="return false;"
            class="custom-audio"
            @timeupdate="handleTimeUpdate"
            @play="handlePlay"
          >
            <source src="https://tianshi-resolve.b-cdn.net/tianshi_resolve.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          
          <transition name="fade">
            <div v-if="previewEnded" class="preview-notice">
              <p>{{ t[currentLang].previewEndedText }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MagicDust from './MagicDust.vue'
import { currentLang, t } from '../locales'

const audioRef = ref<HTMLAudioElement | null>(null)
const previewEnded = ref(false)
const hasTrackedPlay = ref(false)
const hasTrackedPreviewEnd = ref(false)
const PREVIEW_LIMIT = 30 

const pushToDataLayer = (payload: any) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push(payload)
  }
}

const handlePlay = () => {
  // previewEnded.value = false // DA SCOMMENTARE INSIEME AL BLOCCO
  
  if (!hasTrackedPlay.value) {
    pushToDataLayer({
      event: 'audio_interaction',
      audio: {
        action: 'play',
        title: 'The Tianshi\'s Resolve'
      }
    })
    hasTrackedPlay.value = true
  }
}

const handleTimeUpdate = () => {
  if (audioRef.value && audioRef.value.currentTime >= PREVIEW_LIMIT) {
    
    /* =========================================================
       BLOCCO 30 SECONDI - DA SCOMMENTARE IL GIORNO DELLA RELEASE
       =========================================================
    audioRef.value.pause()
    audioRef.value.currentTime = PREVIEW_LIMIT
    previewEnded.value = true
    ========================================================= */
    
    if (!hasTrackedPreviewEnd.value) {
      pushToDataLayer({
        event: 'audio_interaction',
        audio: {
          action: 'reached_30s',
          title: 'The Tianshi\'s Resolve'
        }
      })
      hasTrackedPreviewEnd.value = true
    }
  }
}
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
  position: relative;
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

.preview-notice {
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(56, 229, 157, 0.1);
  border: 1px solid var(--accent-jade);
  border-radius: 6px;
  color: var(--accent-jade);
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 0 5px var(--accent-jade-glow);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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