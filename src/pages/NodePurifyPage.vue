<template>
  <PageShell
    aria-label="淨心點燈"
    step="祈福旅程・步驟 3"
    title="長按點亮天燈"
    subtitle="在安靜的片刻，讓祝福隨光慢慢升起。"
  >
    <ProgressDots :current="3" :total="5" />

    <div v-if="isLit" class="sky-lantern-scene" aria-hidden="true">
      <span
        v-for="item in lanternParticles"
        :key="item.id"
        class="fly-lantern"
        :style="{
          left: `${item.left}%`,
          animationDelay: `${item.delay}s`,
          animationDuration: `${item.duration}s`,
          '--scale': item.scale,
          '--lantern-a': item.colorA,
          '--lantern-b': item.colorB,
          '--lantern-border': item.border,
          '--lantern-glow': item.glow,
        }"
      >
        <span class="fly-lantern-core"></span>
      </span>
    </div>

    <SectionCard tone="soft" class="lantern-wrap u-fade-in">
      <button
        type="button"
        class="lantern-button"
        :class="{ 'is-holding': isHolding, 'is-lit': isLit }"
        :aria-label="statusText"
        @pointerdown.prevent="startHold"
        @pointerup="stopHold"
        @pointerleave="stopHold"
        @pointercancel="stopHold"
        @touchstart.prevent="startHold"
        @touchend="stopHold"
        @touchcancel="stopHold"
        @mousedown.prevent="startHold"
        @mouseup="stopHold"
        @mouseleave="stopHold"
      >
        <span class="lantern-crown" aria-hidden="true"></span>
        <span class="lantern-shell" aria-hidden="true">
          <span class="lantern-pattern lantern-pattern--left"></span>
          <span class="lantern-pattern lantern-pattern--right"></span>
          <span class="lantern-flower"></span>
          <span class="lantern-glow"></span>
        </span>
        <span class="lantern-rim" aria-hidden="true"></span>
        <span class="lantern-flame" aria-hidden="true"></span>
        <span class="lantern-status">{{ statusText }}</span>
        <span class="progress-track" aria-hidden="true">
          <span class="progress-fill" :style="{ width: `${progress}%` }"></span>
        </span>
      </button>
      <p class="hold-tip">{{ holdTip }}</p>
    </SectionCard>

    <SectionCard v-if="isLit" tone="soft" class="u-fade-in">
      <p class="blessing-text">{{ BLESSING_TEXT }}</p>
    </SectionCard>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" :disabled="!isLit" @click="acceptBlessing">
          {{ isLit ? '收下祝福' : '先點亮天燈' }}
        </TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlessingStore } from '../stores/blessingStore'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'
import ProgressDots from '../components/ui/ProgressDots.vue'

const HOLD_MS = 2000
const BLESSING_TEXT = '願心安定，福至平安。'

const router = useRouter()
const blessingStore = useBlessingStore()

const isHolding = ref(false)
const isLit = ref(false)
const progress = ref(0)

const lanternParticles = [
  { id: 1, left: 8, delay: 0.2, duration: 4.8, scale: 0.72, colorA: '#fff1cf', colorB: '#efbf7a', border: '#b68352', glow: 'rgba(244, 193, 115, 0.45)' },
  { id: 2, left: 16, delay: 0.9, duration: 5.2, scale: 0.8, colorA: '#ffe8d7', colorB: '#e7aa83', border: '#b87657', glow: 'rgba(231, 170, 131, 0.42)' },
  { id: 3, left: 24, delay: 0.3, duration: 4.6, scale: 0.68, colorA: '#ffe9c8', colorB: '#ecb666', border: '#b87f44', glow: 'rgba(236, 182, 102, 0.42)' },
  { id: 4, left: 31, delay: 1.4, duration: 5.6, scale: 0.86, colorA: '#ffe6d2', colorB: '#e39d72', border: '#b7734a', glow: 'rgba(227, 157, 114, 0.44)' },
  { id: 5, left: 39, delay: 0.1, duration: 4.7, scale: 0.74, colorA: '#fff0d2', colorB: '#f0be7d', border: '#b9864c', glow: 'rgba(240, 190, 125, 0.44)' },
  { id: 6, left: 46, delay: 1.1, duration: 5.5, scale: 0.92, colorA: '#ffe7d9', colorB: '#e7a783', border: '#b67759', glow: 'rgba(231, 167, 131, 0.42)' },
  { id: 7, left: 54, delay: 0.6, duration: 4.9, scale: 0.7, colorA: '#ffeacb', colorB: '#ebb56e', border: '#b48149', glow: 'rgba(235, 181, 110, 0.42)' },
  { id: 8, left: 61, delay: 1.8, duration: 5.8, scale: 0.95, colorA: '#ffe8d6', colorB: '#e0a27c', border: '#b17250', glow: 'rgba(224, 162, 124, 0.42)' },
  { id: 9, left: 69, delay: 0.4, duration: 4.8, scale: 0.76, colorA: '#fff0d1', colorB: '#efbc78', border: '#b9864b', glow: 'rgba(239, 188, 120, 0.43)' },
  { id: 10, left: 77, delay: 1.2, duration: 5.4, scale: 0.9, colorA: '#ffe8d8', colorB: '#e3a47f', border: '#b47452', glow: 'rgba(227, 164, 127, 0.42)' },
  { id: 11, left: 85, delay: 0.5, duration: 4.9, scale: 0.73, colorA: '#ffebce', colorB: '#edb670', border: '#b78248', glow: 'rgba(237, 182, 112, 0.42)' },
  { id: 12, left: 92, delay: 1.6, duration: 5.7, scale: 0.88, colorA: '#ffe7d7', colorB: '#e2a27b', border: '#b47250', glow: 'rgba(226, 162, 123, 0.42)' },
]

let startAt = 0
let rafId = null

function clearTicker() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function tick(now) {
  if (!isHolding.value || isLit.value) return

  const elapsed = now - startAt
  progress.value = Math.min((elapsed / HOLD_MS) * 100, 100)

  if (elapsed >= HOLD_MS) {
    isHolding.value = false
    isLit.value = true
    progress.value = 100
    clearTicker()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startHold() {
  if (isLit.value || isHolding.value) return
  isHolding.value = true
  progress.value = 0
  startAt = performance.now()
  clearTicker()
  rafId = requestAnimationFrame(tick)
}

function stopHold() {
  if (!isHolding.value || isLit.value) return
  isHolding.value = false
  progress.value = 0
  clearTicker()
}

function acceptBlessing() {
  if (!isLit.value) return
  blessingStore.setBlessingMessage(BLESSING_TEXT)
  router.push('/journey/story')
}

function goBack() {
  router.push('/reminder')
}

const statusText = computed(() => {
  if (isLit.value) return '天燈已點亮'
  if (isHolding.value) return '請持續按住 2 秒'
  return '長按點亮 2 秒'
})

const holdTip = computed(() => {
  if (isLit.value) return '天燈已升起，請收下今日祝福。'
  if (isHolding.value) return '光正在聚集，請持續按住不要放開。'
  return '請長按天燈 2 秒，直到光圈填滿。'
})

onMounted(() => {
  if (typeof blessingStore.completeNode === 'function') {
    blessingStore.completeNode('purify')
  }
})

onBeforeUnmount(() => {
  clearTicker()
})
</script>

<style scoped>
.lantern-wrap {
  display: grid;
  place-items: center;
}

.lantern-button {
  width: min(74vw, 228px);
  height: min(92vw, 292px);
  border: none;
  background: transparent;
  box-shadow: none;
  color: #5d4330;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: relative;
  transition: transform 0.16s ease, box-shadow var(--transition-soft), background var(--transition-soft);
}

.lantern-top {
  display: none;
}

.lantern-crown {
  position: absolute;
  top: 18px;
  width: 58%;
  height: 16px;
  border-radius: var(--radius-pill);
  border: 1.2px solid rgba(170, 117, 72, 0.55);
  background: rgba(251, 228, 188, 0.7);
}

.lantern-shell {
  position: absolute;
  top: 24px;
  width: 84%;
  height: 70%;
  border: 2px solid rgba(176, 117, 66, 0.7);
  border-radius: 24% 24% 12% 12% / 24% 24% 18% 18%;
  clip-path: polygon(50% 0%, 88% 14%, 99% 42%, 78% 88%, 22% 88%, 1% 42%, 12% 14%);
  background: linear-gradient(180deg, #faecd2 0%, #f6d5aa 54%, #ebb67a 100%);
  box-shadow: inset 0 -10px 22px rgba(233, 177, 111, 0.3), 0 10px 22px rgba(137, 94, 56, 0.18);
}

.lantern-pattern {
  position: absolute;
  top: 8%;
  width: 1px;
  height: 78%;
  background: rgba(178, 125, 77, 0.42);
}

.lantern-pattern--left {
  left: 34%;
  transform: rotate(-7deg);
}

.lantern-pattern--right {
  right: 34%;
  transform: rotate(7deg);
}

.lantern-flower {
  position: absolute;
  top: 12%;
  left: 50%;
  width: 14px;
  height: 14px;
  transform: translateX(-50%);
  border: 1px solid rgba(188, 127, 71, 0.55);
  border-radius: 50%;
  background: rgba(255, 236, 206, 0.7);
}

.lantern-flower::before,
.lantern-flower::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 1px solid rgba(188, 127, 71, 0.4);
}

.lantern-glow {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 62%;
  height: 36%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 246, 203, 0.95), rgba(255, 204, 132, 0.45));
  box-shadow: 0 0 18px rgba(248, 203, 122, 0.4);
}

.lantern-rim {
  position: absolute;
  bottom: 27px;
  width: 70%;
  height: 20px;
  border-radius: 50%;
  border: 1.6px solid rgba(164, 110, 65, 0.75);
  background: linear-gradient(180deg, rgba(243, 203, 146, 0.65), rgba(233, 180, 112, 0.82));
  box-shadow: inset 0 -4px 8px rgba(178, 120, 73, 0.32);
}

.lantern-flame {
  position: absolute;
  bottom: 10px;
  width: 12px;
  height: 22px;
  border-radius: 50% 50% 55% 55%;
  background: radial-gradient(circle at 50% 30%, #fffde9 0%, #ffe8aa 48%, #f4bb63 100%);
  box-shadow: 0 0 12px rgba(247, 195, 104, 0.7);
}

.lantern-button.is-holding {
  transform: scale(0.992);
  filter: drop-shadow(0 0 0 10px rgba(239, 194, 122, 0.2)) drop-shadow(0 16px 30px rgba(128, 84, 45, 0.24));
}

.lantern-button.is-lit {
  filter: drop-shadow(0 0 0 12px rgba(241, 203, 132, 0.24)) drop-shadow(0 16px 34px rgba(128, 84, 45, 0.28));
}

.lantern-button.is-holding::after {
  content: '';
  position: absolute;
  inset: 10px 16px 26px;
  border-radius: 26% 26% 12% 12% / 26% 26% 18% 18%;
  border: 2px solid rgba(236, 184, 107, 0.45);
  animation: hold-pulse 1.1s ease-in-out infinite;
}

.lantern-status {
  position: relative;
  z-index: 2;
  margin-top: 8px;
  font-size: var(--font-sm);
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(255, 248, 228, 0.75);
}

.progress-track {
  width: 78%;
  height: 10px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.progress-fill {
  height: 100%;
  display: block;
  width: 0%;
  background: linear-gradient(90deg, #efb876, #d58b45);
  transition: width 0.06s linear;
}

.blessing-text {
  text-align: center;
  color: #674a34;
  font-size: var(--font-lg);
  font-weight: 600;
  line-height: var(--line-copy-tight);
}

.hold-tip {
  margin-top: var(--space-2);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-sm);
  line-height: var(--line-copy-tight);
}

.sky-lantern-scene {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  overflow: hidden;
}

.fly-lantern {
  position: absolute;
  bottom: -14vh;
  width: 30px;
  height: 42px;
  border-radius: 45% 45% 30% 30%;
  border: 1px solid var(--lantern-border);
  background: linear-gradient(180deg, var(--lantern-a), var(--lantern-b));
  box-shadow: 0 0 14px var(--lantern-glow);
  animation-name: lantern-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.fly-lantern-core {
  position: absolute;
  left: 50%;
  top: 52%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 244, 186, 0.92);
  box-shadow: 0 0 12px rgba(255, 208, 126, 0.82);
}

@keyframes hold-pulse {
  0% {
    opacity: 0.45;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.01);
  }
  100% {
    opacity: 0.45;
    transform: scale(0.98);
  }
}

@keyframes lantern-rise {
  0% {
    transform: translate3d(0, 14vh, 0) scale(var(--scale, 1));
    opacity: 0;
  }
  12% {
    opacity: 0.95;
  }
  100% {
    transform: translate3d(8px, -120vh, 0) scale(var(--scale, 1));
    opacity: 0;
  }
}
</style>
