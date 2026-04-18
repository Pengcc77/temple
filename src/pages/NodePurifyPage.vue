<template>
  <PageShell
    aria-label="淨心點燈"
    step="祈福旅程・步驟 3"
    title="長按點亮心燈"
    subtitle="在安靜的片刻，讓祝福慢慢亮起。"
  >
    <ProgressDots :current="3" :total="5" />

    <SectionCard tone="soft" class="lamp-wrap u-fade-in">
      <button
        type="button"
        class="lamp-button"
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
        <span class="lamp-core" aria-hidden="true"></span>
        <span class="lamp-status">{{ statusText }}</span>
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
          {{ isLit ? '收下祝福' : '先點亮心燈' }}
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
  if (isLit.value) return '心燈已點亮'
  if (isHolding.value) return '請持續按住 2 秒'
  return '長按點燈 2 秒'
})

const holdTip = computed(() => {
  if (isLit.value) return '點亮完成，請收下今日祝福。'
  if (isHolding.value) return '光圈正在點亮，請持續按住不要放開。'
  return '請長按圓燈 2 秒，直到光圈填滿。'
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
.lamp-wrap {
  display: grid;
  place-items: center;
}

.lamp-button {
  width: min(76vw, 250px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid rgba(157, 111, 77, 0.36);
  background: radial-gradient(circle at 35% 30%, #fff6ea, #ecd4bb 58%, #d9b390);
  box-shadow: 0 12px 30px rgba(136, 95, 62, 0.22);
  color: #5d4330;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: relative;
  transition: transform 0.16s ease, box-shadow var(--transition-soft), background var(--transition-soft);
}

.lamp-button.is-holding {
  transform: scale(0.992);
  box-shadow: 0 0 0 12px rgba(239, 194, 122, 0.22), 0 16px 36px rgba(128, 84, 45, 0.28);
}

.lamp-button.is-lit {
  background: radial-gradient(circle at 35% 30%, #fff9de, #f3d18d 55%, #d8a35c);
  box-shadow: 0 0 0 12px rgba(241, 203, 132, 0.24), 0 16px 34px rgba(128, 84, 45, 0.32);
}

.lamp-button.is-holding::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid rgba(236, 184, 107, 0.45);
  animation: hold-pulse 1.1s ease-in-out infinite;
}

.lamp-core {
  width: 34%;
  max-width: 58px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(circle, #fff8ec, #ffd587 60%, #f3b867);
  box-shadow: 0 0 22px rgba(253, 205, 124, 0.48);
}

.lamp-status {
  font-size: var(--font-sm);
  font-weight: 600;
}

.progress-track {
  width: 78%;
  height: 10px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.58);
  overflow: hidden;
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
</style>
