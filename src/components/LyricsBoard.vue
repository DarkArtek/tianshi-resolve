<template>
  <section class="lyrics-section">
    <h2>{{ t[currentLang].lyricsTitle }}</h2>
    <div class="lyrics-container">
      <p class="lyric-line chinese-text">静一静…你听<br>废墟中 祈祷多轻柔<br>别消散<br>让回声把希望连成一体</p>
      <p class="lyric-line">Dust in the wind<br>Pulse like echoes on broken chains<br>Street names buried<br>Under shattered glass and silver rain</p>
      <p class="lyric-line chinese-text">你说别怕<br>沾满灰的手也能握住光<br>战鼓唤醒满地残响<br>微笑着说我们要活下去啊</p>
      <p class="lyric-line highlight">After the fall, we rise!<br>Stone over stone, reaching for the sky<br>You bear the weight, I hold the light<br>We forge a new dawn where shadows die!</p>
      <p class="lyric-line chinese-text">沉睡的城 慢慢苏醒<br>一砖一瓦 都刻着勇气</p>
      <p class="lyric-line">You call my name<br>I answer yours<br>After the fall<br>We stand to build once more!</p>
      <p class="lyric-line">Endless nights<br>Broken banners bathed in the sun<br>Power lines humming back<br>Ancient zithers waking up</p>
      <p class="lyric-line chinese-text">她说别退<br>脚下是星光铺的路<br>跟着心跳和清脆的笛声<br>把这废墟绘成一幅画</p>
      <p class="lyric-line highlight">After the fall, we rise!<br>Stone over stone, reaching for the sky<br>You bear the weight, I hold the light<br>We forge a new dawn where shadows die!</p>
      <p class="lyric-line chinese-text">沉睡的城 慢慢苏醒<br>一砖一瓦 都刻着勇气</p>
      <p class="lyric-line">You call my name<br>I answer yours<br>After the fall<br>We stand to build once more!</p>
      <p class="lyric-line chinese-text">风和雨<br>浇不灭你眼里的火</p>
      <p class="lyric-line">If every scar is a guiding light<br>We step out of the night...</p>
      <p class="lyric-line chinese-text">你说明天已来<br>哪怕战旗曾支离破碎</p>
      <p class="lyric-line highlight">Zhuang Fangyi, standing tall...<br>Weaving ancient arts through the storm!<br>Turning sorrow into a battle cry!</p>
      <p class="lyric-line highlight">After the fall, we rise!<br>Stone over stone, reaching for the sky<br>You bear the weight, I hold the light<br>We forge a new dawn where shadows die!</p>
      <p class="lyric-line chinese-text">沉睡的城 慢慢苏醒<br>一砖一瓦 都刻着勇气</p>
      <p class="lyric-line">You call my name<br>I answer yours!<br>After the fall<br>We stand to build once more!</p>
      <p class="lyric-line chinese-text">在晨光中<br>轻抚重连的古老铜弦</p>
      <p class="lyric-line">After the fall, we stand<br>And this time...<br>We live to keep it ours to defend.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { currentLang, t } from '../locales'
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent-jade);
  border-left: 4px solid var(--accent-jade);
  padding-left: 1rem;
}

.lyrics-container {
  height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-jade) var(--bg-color);
}

.lyric-line {
  margin-bottom: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.lyric-line:hover {
  opacity: 1;
}

.lyric-line.highlight {
  color: var(--accent-gold);
  font-weight: 600;
  text-shadow: 0 0 10px var(--accent-gold-glow);
}

/* Ottimizzazione Mobile */
@media (max-width: 900px) {
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .lyrics-container {
    height: 400px;
    padding-right: 0.5rem;
  }
}
</style>