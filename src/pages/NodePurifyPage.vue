<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlessingStore } from '../stores/blessingStore'

const HOLD_MS = 2000
const BLESSING_TEXT = '願心安定，福至平安'

const router = useRouter()
const blessingStore = useBlessingStore()
const { completeNode } = blessingStore

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

  // Store if available; fallback text remains BLESSING_TEXT in this page and ResultPage defaults.
  if (typeof blessingStore.setBlessingMessage === 'function') {
    blessingStore.setBlessingMessage(BLESSING_TEXT)
  }
  if (typeof blessingStore.setSelectedBlessingId === 'function') {
    blessingStore.setSelectedBlessingId('peaceful-heart')
  }

  router.push('/result')
}

const statusText = computed(() => {
  if (isLit.value) return '心燈已點亮'
  if (isHolding.value) return '請持續按住 2 秒'
  return '長按點燈 2 秒'
})

onMounted(() => {
  completeNode('purify')
})

onBeforeUnmount(() => {
  clearTicker()
})
</script>

<template>
  <main class="purify-page" aria-label="淨心點燈">
    <section class="ritual-card">
      <header class="ritual-header">
        <p class="step-text">祈福旅程・淨心</p>
        <h1>長按點亮心燈</h1>
        <p class="subtitle">在安靜的片刻，為心中祈願點上一盞柔和的光。</p>
      </header>

      <section class="ritual-center">
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
      </section>

      <p v-if="isLit" class="blessing-text">{{ BLESSING_TEXT }}</p>

      <footer class="ritual-footer">
        <button
          v-if="isLit"
          type="button"
          class="accept-btn"
          @click="acceptBlessing"
        >
          收下祝福
        </button>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.purify-page {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 25% 12%, rgba(255, 244, 225, 0.9), transparent 45%),
    radial-gradient(circle at 82% 85%, rgba(246, 225, 201, 0.75), transparent 40%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.ritual-card {
  width: min(100%, 390px);
  min-height: calc(100dvh - 40px);
  border-radius: 22px;
  padding: 24px 18px 20px;
  background: rgba(255, 251, 245, 0.84);
  border: 1px solid rgba(173, 128, 90, 0.2);
  box-shadow: 0 14px 30px rgba(112, 82, 58, 0.11);
  display: flex;
  flex-direction: column;
}

.ritual-header {
  text-align: center;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.ritual-header h1 {
  margin: 10px 0 8px;
  font-size: 29px;
  line-height: 1.25;
  color: #4f3b2a;
}

.subtitle {
  margin: 0;
  color: #6f5845;
  line-height: 1.6;
}

.ritual-center {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 24px 0 12px;
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
  transition: transform 0.16s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.lamp-button.is-holding {
  transform: scale(0.992);
}

.lamp-button.is-lit {
  background: radial-gradient(circle at 35% 30%, #fff9de, #f3d18d 55%, #d8a35c);
  box-shadow: 0 0 0 10px rgba(241, 203, 132, 0.2), 0 16px 34px rgba(128, 84, 45, 0.32);
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
  font-size: 15px;
  font-weight: 600;
}

.progress-track {
  width: 78%;
  height: 8px;
  border-radius: 999px;
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
  margin: 0 0 12px;
  text-align: center;
  color: #674a34;
  font-size: 17px;
  font-weight: 600;
}

.ritual-footer {
  min-height: 48px;
}

.accept-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 999px;
  color: #fffaf3;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
}

.accept-btn:active {
  transform: translateY(1px);
}

@media (max-width: 360px) {
  .ritual-header h1 {
    font-size: 25px;
  }
}
</style>
