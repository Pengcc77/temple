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
        }"
      >
        <span class="fly-lantern-image" :class="`is-variant-${item.variant}`"></span>
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
        <span class="lantern-aura" aria-hidden="true"></span>
        <span class="lantern-image is-variant-0" aria-hidden="true"></span>
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
import lanternSheet from '../assets/sky-lantern-sheet.png'

const HOLD_MS = 2000
const BLESSING_TEXT = '願心安定，福至平安。'

const router = useRouter()
const blessingStore = useBlessingStore()

const isHolding = ref(false)
const isLit = ref(false)
const progress = ref(0)

const lanternParticles = [
  { id: 1, left: 8, delay: 0.2, duration: 4.8, scale: 0.72, variant: 0 },
  { id: 2, left: 16, delay: 0.9, duration: 5.2, scale: 0.8, variant: 1 },
  { id: 3, left: 24, delay: 0.3, duration: 4.6, scale: 0.68, variant: 2 },
  { id: 4, left: 31, delay: 1.4, duration: 5.6, scale: 0.86, variant: 3 },
  { id: 5, left: 39, delay: 0.1, duration: 4.7, scale: 0.74, variant: 0 },
  { id: 6, left: 46, delay: 1.1, duration: 5.5, scale: 0.92, variant: 1 },
  { id: 7, left: 54, delay: 0.6, duration: 4.9, scale: 0.7, variant: 2 },
  { id: 8, left: 61, delay: 1.8, duration: 5.8, scale: 0.95, variant: 3 },
  { id: 9, left: 69, delay: 0.4, duration: 4.8, scale: 0.76, variant: 0 },
  { id: 10, left: 77, delay: 1.2, duration: 5.4, scale: 0.9, variant: 1 },
  { id: 11, left: 85, delay: 0.5, duration: 4.9, scale: 0.73, variant: 2 },
  { id: 12, left: 92, delay: 1.6, duration: 5.7, scale: 0.88, variant: 3 },
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

.lantern-aura {
  position: absolute;
  inset: 18px 18px 36px;
  border-radius: 28% 28% 18% 18% / 24% 24% 20% 20%;
  background: radial-gradient(circle at 50% 58%, rgba(255, 241, 190, 0.48), transparent 60%);
  opacity: 0.72;
}

.lantern-image,
.fly-lantern-image {
  position: absolute;
  background-image: url(v-bind(lanternSheet));
  background-repeat: no-repeat;
  background-size: 200% 200%;
}

.lantern-image {
  top: 4px;
  left: 50%;
  width: 86%;
  height: 88%;
  transform: translateX(-50%);
  filter: drop-shadow(0 14px 24px rgba(138, 93, 56, 0.18));
}

.fly-lantern-image {
  inset: 0;
}

.is-variant-0 {
  background-position: 0% 0%;
}

.is-variant-1 {
  background-position: 100% 0%;
}

.is-variant-2 {
  background-position: 0% 100%;
}

.is-variant-3 {
  background-position: 100% 100%;
}

.lantern-button.is-holding {
  transform: scale(0.993);
}

.lantern-button.is-holding .lantern-aura,
.lantern-button.is-holding .lantern-image {
  animation: lantern-flicker 1.05s ease-in-out infinite;
}

.lantern-button.is-lit {
  filter: drop-shadow(0 0 16px rgba(241, 203, 132, 0.22));
}

.lantern-button.is-holding::after {
  content: '';
  position: absolute;
  inset: 18px 18px 34px;
  border-radius: 26% 26% 12% 12% / 26% 26% 18% 18%;
  border: 1.5px solid rgba(236, 184, 107, 0.5);
  animation: hold-pulse 1.1s ease-in-out infinite;
}

.lantern-status {
  position: relative;
  z-index: 2;
  margin-top: 22px;
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
  height: 46px;
  filter: drop-shadow(0 0 10px rgba(244, 197, 122, 0.26));
  animation-name: lantern-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
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

@keyframes lantern-flicker {
  0% {
    filter: drop-shadow(0 0 12px rgba(245, 198, 118, 0.26));
    opacity: 0.92;
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 219, 150, 0.48));
    opacity: 1;
  }
  100% {
    filter: drop-shadow(0 0 12px rgba(245, 198, 118, 0.26));
    opacity: 0.92;
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
