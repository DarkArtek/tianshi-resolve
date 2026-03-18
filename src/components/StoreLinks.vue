<template>
  <section class="store-links-section">
    <h3>{{ t[currentLang].listenOn }}</h3>
    <div class="store-grid">
      <a href="#" target="_blank" rel="noopener noreferrer" class="store-btn" aria-label="Listen on Spotify">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="store-icon">
          <path fill="currentColor" d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM420.7 436.9C416.5 436.9 413.9 435.6 410 433.3C347.6 395.7 275 394.1 203.3 408.8C199.4 409.8 194.3 411.4 191.4 411.4C181.7 411.4 175.6 403.7 175.6 395.6C175.6 385.3 181.7 380.4 189.2 378.8C271.1 360.7 354.8 362.3 426.2 405C432.3 408.9 435.9 412.4 435.9 421.5C435.9 430.6 428.8 436.9 420.7 436.9zM447.6 371.3C442.4 371.3 438.9 369 435.3 367.1C372.8 330.1 279.6 315.2 196.7 337.7C191.9 339 189.3 340.3 184.8 340.3C174.1 340.3 165.4 331.6 165.4 320.9C165.4 310.2 170.6 303.1 180.9 300.2C208.7 292.4 237.1 286.6 278.7 286.6C343.6 286.6 406.3 302.7 455.7 332.1C463.8 336.9 467 343.1 467 351.8C466.9 362.6 458.5 371.3 447.6 371.3zM478.6 295.1C473.4 295.1 470.2 293.8 465.7 291.2C394.5 248.7 267.2 238.5 184.8 261.5C181.2 262.5 176.7 264.1 171.9 264.1C158.7 264.1 148.6 253.8 148.6 240.5C148.6 226.9 157 219.2 166 216.6C201.2 206.3 240.6 201.4 283.5 201.4C356.5 201.4 433 216.6 488.9 249.2C496.7 253.7 501.8 259.9 501.8 271.8C501.8 285.4 490.8 295.1 478.6 295.1z"/>
        </svg>
        <span>Spotify</span>
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer" class="store-btn" aria-label="Listen on Apple Music">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="store-icon">
          <path fill="currentColor" d="M319.6 144.3C257.4 142.8 199.4 175.2 167.9 228.8C136.4 282.4 136.4 348.9 168 402.5C199.5 456.1 257.6 488.3 319.8 486.8C382 488.3 440 455.9 471.5 402.3C503 348.7 503 282.2 471.4 228.6C439.9 175 381.8 142.8 319.6 144.3zM399 384.3C395.8 397.9 385.5 405.5 371.7 408.1C359.6 410.3 349.5 410.9 339.8 403.1C328 393.1 327.8 376.7 338.4 366.3C346.8 358.3 358.7 356.7 376.4 353.5C379.4 353 382 352.3 384.1 349.8C387.3 346.2 386.3 347.8 386.3 269C386.3 263.4 383.6 261.9 377.9 262.9C373.9 263.6 286 280 286 280C281 281.1 279.3 282.6 279.3 288.3C279.3 404.4 279.8 399.1 278.1 406.8C276 415.8 270.5 422.6 263.2 426.4C254.9 431 239.8 433 231.8 431.6C210.4 427.6 202.9 402.9 217.4 388.7C225.8 380.7 237.7 379.1 255.4 375.9C258.4 375.4 261 374.7 263.1 372.2C268.1 366.5 264 245.2 265.7 238.5C266.1 235.9 267.2 233.7 269.2 232.1C271.3 230.4 275 229.4 275.9 229.4C376.9 210.4 389.2 208 391 208C396.7 207.6 400 211 400 216.7C399.9 387.3 400.4 378.1 399 384.3zM441.2 96L198.8 96C141.9 96 96 141.9 96 198.8L96 441.2C96 498.1 141.9 544 198.8 544L441.2 544C498.2 544 544 498.1 544 441.2L544 198.8C544 141.9 498.1 96 441.2 96zM319.6 123C425.9 123 512.1 209.2 512.1 315.5C512.1 421.8 425.9 508 319.6 508C213.3 508 127.1 421.8 127.1 315.5C127.1 209.2 213.3 123 319.6 123z"/>
        </svg>
        <span>Apple Music</span>
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer" class="store-btn" aria-label="Listen on YouTube Music">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="store-icon">
          <path fill="currentColor" d="M21.582 6.186a2.686 2.686 0 0 0-1.884-1.898C17.98 3.8 12 3.8 12 3.8s-5.98 0-7.698.488a2.686 2.686 0 0 0-1.884 1.898C2 7.896 2 12 2 12s0 4.104.418 5.814a2.686 2.686 0 0 0 1.884 1.898c1.718.488 7.698.488 7.698.488s5.98 0 7.698-.488a2.686 2.686 0 0 0 1.884-1.898C22 16.104 22 12 22 12s0-4.104-.418-5.814zM9.99 15.405V8.595L15.932 12l-5.942 3.405z"/>
        </svg>
        <span>YouTube</span>
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer" class="store-btn" aria-label="Listen on Deezer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="store-icon">
          <path fill="currentColor" d="M78.8 165.1C70.6 165.1 64 191.6 64 224.3C64 257 70.6 283.5 78.8 283.5C87 283.5 93.6 257 93.6 224.3C93.6 191.6 87 165.1 78.8 165.1zM512.7 104.9C505 104.9 498.2 122 493.3 149C485.6 102.3 473.1 72 459.1 72C442.3 72 428 114.9 421.1 177.4C414.5 132 404.3 103.2 392.8 103.2C376.7 103.2 363.2 160.1 358.1 239.4C348.7 198.6 334.9 173.1 319.8 173.1C304.7 173.1 291 198.6 281.5 239.4C276.4 160.1 262.9 103.2 246.8 103.2C235.3 103.2 225.1 132 218.5 177.4C211.9 114.9 197.3 72 180.7 72C166.7 72 154.2 102.4 146.5 149C141.7 122 134.8 104.9 127.1 104.9C112.8 104.9 101.1 164.1 101.1 237C101.1 309.9 113 369.2 127.3 369.2C133.2 369.2 138.8 359.3 143.1 342.4C150 404.1 164.3 446.5 181.1 446.5C194.1 446.5 205.6 421 213.2 380.9C218.6 457.2 231.8 511.3 247.4 511.3C257.1 511.3 266 489.9 272.7 454.9C280.6 527.1 299 577.6 320.4 577.6C341.8 577.6 359.9 527.1 368.1 454.9C374.7 489.9 383.7 511.3 393.4 511.3C409 511.3 422.2 457.2 427.6 380.9C435.3 421 447 446.5 459.7 446.5C476.3 446.5 490.6 404.2 497.7 342.4C502 359.2 507.4 369.2 513.5 369.2C527.8 369.2 539.5 310 539.5 237.1C539.5 164.2 527 104.9 512.7 104.9zM561.2 165.1C553 165.1 546.4 191.6 546.4 224.3C546.4 257 553 283.5 561.2 283.5C569.4 283.5 576 257 576 224.3C576 191.6 569.4 165.1 561.2 165.1z"/>
        </svg>
        <span>Deezer</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { currentLang, t } from '../locales'
</script>

<style scoped>
.store-links-section {
  text-align: center;
  padding: 2rem 0;
  margin-bottom: 3rem;
  border-bottom: 1px dashed var(--border-muted);
}

h3 {
  color: var(--text-muted);
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.store-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.store-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-muted);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  color: var(--text-main);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.store-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.store-btn:hover {
  border-color: var(--accent-jade);
  box-shadow: 0 0 15px var(--accent-jade-glow);
  color: var(--accent-jade);
  transform: translateY(-2px);
}

.store-btn:hover .store-icon {
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .store-grid {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
  .store-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>