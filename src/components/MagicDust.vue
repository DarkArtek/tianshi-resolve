<template>
  <canvas ref="canvasRef" class="magic-dust-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  alpha: number
}

const particles: Particle[] = []
const colors = ['#d4af37', '#2D6F5E', '#4ade80'] 

const resizeCanvas = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = canvasRef.value.parentElement?.clientWidth || window.innerWidth
  canvasRef.value.height = canvasRef.value.parentElement?.clientHeight || window.innerHeight
}

const initParticles = (width: number, height: number) => {
  particles.length = 0
  const particleCount = Math.floor((width * height) / 15000) 
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 1) * 0.5,
      alpha: Math.random() * 0.5 + 0.1
    })
  }
}

const animate = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy

    if (p.y < 0) {
      p.y = canvasRef.value!.height
      p.x = Math.random() * canvasRef.value!.width
    }
    if (p.x < 0) p.x = canvasRef.value!.width
    if (p.x > canvasRef.value!.width) p.x = 0

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.globalAlpha = p.alpha
    ctx.fill()
  })

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  resizeCanvas()
  if (canvasRef.value) {
    initParticles(canvasRef.value.width, canvasRef.value.height)
    animate()
  }
  window.addEventListener('resize', () => {
    resizeCanvas()
    if (canvasRef.value) {
      initParticles(canvasRef.value.width, canvasRef.value.height)
    }
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.magic-dust-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; 
  z-index: 0;
}
</style>