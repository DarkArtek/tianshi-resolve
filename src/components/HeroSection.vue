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
              <p class="preview-text">{{ t[currentLang].previewEndedText }}</p>
              
              <div class="store-buttons-container">
                <button 
                  v-if="appSettings.storeLinks.spotify" 
                  class="store-btn spotify" 
                  @click="handleStoreClick('Spotify', appSettings.storeLinks.spotify)"
                  title="Ascolta su Spotify"
                >
                  <svg viewBox="0 0 496 512" width="24" height="24"><path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-72.5-47-152.2-46.6-222.1-25.2-11.3 3.6-19.1-4.5-20.4-12.6-1.3-10.7 4.2-18.4 15.2-21.7 78.9-24.9 167.9-25.5 248.6 26.8 6.5 3.9 10.7 8.7 10.7 17.1-1.3 10.7-10.3 19.8-19.7 19.8zm32.7-72.2c-5.8 0-9.7-2.6-14.5-5.5-82.8-54-179.9-57.9-261.1-34-15.8 4.5-24.9-5.8-27.5-16.2-2.9-10.7 4.5-20.7 16.2-23.9 92.5-27.5 199.3-22.6 292.5 37.8 7.4 4.8 11.9 11 11.9 20.4-.3 11.3-11.3 21.4-17.5 21.4z"/></svg>
                </button>

                <button 
                  v-if="appSettings.storeLinks.appleMusic" 
                  class="store-btn apple" 
                  @click="handleStoreClick('Apple Music', appSettings.storeLinks.appleMusic)"
                  title="Ascolta su Apple Music"
                >
                  <svg viewBox="0 0 384 512" width="24" height="24"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                </button>

                <button 
                  v-if="appSettings.storeLinks.amazonMusic" 
                  class="store-btn amazon" 
                  @click="handleStoreClick('Amazon Music', appSettings.storeLinks.amazonMusic)"
                  title="Ascolta su Amazon Music"
                >
                  <svg viewBox="0 0 448 512" width="24" height="24"><path fill="currentColor" d="M257.7 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56s-32.3-25.3-32.3-52.8l0-147.1C341.5 89 317 32 229.2 32 141.2 32 94.5 87 94.5 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8l0 40.6zM393.7 413c-7.7 10-70 67-174.5 67S34.7 408.5 10.2 379c-6.8-7.7 1-11.3 5.5-8.3 73.3 44.5 187.8 117.8 372.5 30.3 7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/></svg>
                </button>

                <button 
                  v-if="appSettings.storeLinks.youtube" 
                  class="store-btn youtube" 
                  @click="handleStoreClick('YouTube', appSettings.storeLinks.youtube)"
                  title="Ascolta su YouTube"
                >
                  <svg viewBox="0 0 576 512" width="24" height="24"><path fill="currentColor" d="M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z"/></svg>
                </button>

                <button 
                  v-if="appSettings.storeLinks.deezer" 
                  class="store-btn deezer" 
                  @click="handleStoreClick('Deezer', appSettings.storeLinks.deezer)"
                  title="Ascolta su Deezer"
                >
                  <svg viewBox="0 0 512 512" width="24" height="24"><path fill="currentColor" d="M14.8 101.1C6.6 101.1 0 127.6 0 160.3s6.6 59.2 14.8 59.2 14.8-26.5 14.8-59.2-6.6-59.2-14.8-59.2zM448.7 40.9c-7.7 0-14.5 17.1-19.4 44.1-7.7-46.7-20.2-77-34.2-77-16.8 0-31.1 42.9-38 105.4-6.6-45.4-16.8-74.2-28.3-74.2-16.1 0-29.6 56.9-34.7 136.2-9.4-40.8-23.2-66.3-38.3-66.3s-28.8 25.5-38.3 66.3c-5.1-79.3-18.6-136.2-34.7-136.2-11.5 0-21.7 28.8-28.3 74.2-6.6-62.5-21.2-105.4-37.8-105.4-14 0-26.5 30.4-34.2 77-4.8-27-11.7-44.1-19.4-44.1-14.3 0-26 59.2-26 132.1S49 305.2 63.3 305.2c5.9 0 11.5-9.9 15.8-26.8 6.9 61.7 21.2 104.1 38 104.1 13 0 24.5-25.5 32.1-65.6 5.4 76.3 18.6 130.4 34.2 130.4 9.7 0 18.6-21.4 25.3-56.4 7.9 72.2 26.3 122.7 47.7 122.7s39.5-50.5 47.7-122.7c6.6 35 15.6 56.4 25.3 56.4 15.6 0 28.8-54.1 34.2-130.4 7.7 40.1 19.4 65.6 32.1 65.6 16.6 0 30.9-42.3 38-104.1 4.3 16.8 9.7 26.8 15.8 26.8 14.3 0 26-59.2 26-132.1S463 40.9 448.7 40.9zm48.5 60.2c-8.2 0-14.8 26.5-14.8 59.2s6.6 59.2 14.8 59.2 14.8-26.5 14.8-59.2-6.6-59.2-14.8-59.2z"/></svg>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MagicDust from './MagicDust.vue'
import { currentLang, t } from '../locales'

const audioRef = ref<HTMLAudioElement | null>(null)
const previewEnded = ref(false)
const hasTrackedPlay = ref(false)
const hasTrackedPreviewEnd = ref(false)
const PREVIEW_LIMIT = 30 

const appSettings = ref({
  previewLimitActive: false,
  storeLinks: {
    spotify: '',
    appleMusic: '',
    amazonMusic: '',
    youtube: '',
    deezer: ''
  }
})

onMounted(async () => {
  try {
    const res = await fetch('/api/settings')
    if (res.ok) {
      const data = await res.json()
      // Fallback sicuro se mancano dati nel KV
      appSettings.value = {
        previewLimitActive: data.previewLimitActive ?? false,
        storeLinks: { ...appSettings.value.storeLinks, ...data.storeLinks }
      }
    }
  } catch (error) {
    console.error("Errore nel caricamento delle impostazioni dal KV", error)
  }
})

const pushToDataLayer = (payload: any) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push(payload)
  }
}

const handleStoreClick = (platformName: string, url: string) => {
  if (!url) return;
  
  pushToDataLayer({
    event: 'store_click',
    platform: platformName
  });
  
  window.open(url, '_blank', 'noopener,noreferrer');
}

const handlePlay = () => {
  if (appSettings.value.previewLimitActive && audioRef.value && audioRef.value.currentTime >= PREVIEW_LIMIT) {
     previewEnded.value = false 
  }
  
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
    if (appSettings.value.previewLimitActive) {
      audioRef.value.pause()
      audioRef.value.currentTime = PREVIEW_LIMIT
      previewEnded.value = true
    }
    
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
  padding: 1rem;
  background: rgba(56, 229, 157, 0.1);
  border: 1px solid var(--accent-jade);
  border-radius: 6px;
  color: var(--accent-jade);
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 0 5px var(--accent-jade-glow);
}

.preview-text {
  margin-bottom: 1rem;
}

.store-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.store-btn {
  background: transparent;
  border: 1px solid var(--accent-jade);
  color: var(--text-main);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.store-btn:hover {
  background: rgba(56, 229, 157, 0.2);
  color: var(--accent-jade);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px var(--accent-jade-glow);
}

/* Colori brand specifici all'hover */
.store-btn.spotify:hover { color: #1DB954; border-color: #1DB954; box-shadow: 0 5px 15px rgba(29, 185, 84, 0.4); }
.store-btn.apple:hover { color: #FA243C; border-color: #FA243C; box-shadow: 0 5px 15px rgba(250, 36, 60, 0.4); }
.store-btn.youtube:hover { color: #FF0000; border-color: #FF0000; box-shadow: 0 5px 15px rgba(255, 0, 0, 0.4); }
.store-btn.amazon:hover { color: #00A8E1; border-color: #00A8E1; box-shadow: 0 5px 15px rgba(0, 168, 225, 0.4); }
.store-btn.deezer:hover { color: #EF5466; border-color: #EF5466; box-shadow: 0 5px 15px rgba(239, 84, 102, 0.4); }

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