<script setup>
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  holdMs: {
    type: Number,
    default: 2000,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  idleText: {
    type: String,
    default: '長按 2 秒點亮心燈',
  },
  holdingText: {
    type: String,
    default: '請持續按住...',
  },
  doneText: {
    type: String,
    default: '心燈已點亮',
  },
})

const emit = defineEmits(['completed', 'cancelled', 'progress'])

const isHolding = ref(false)
const isLit = ref(false)
const progress = ref(0)

let rafId = null
let holdStart = 0

function resetRaf() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function updateProgress(timestamp) {
  if (!isHolding.value) return

  const elapsed = timestamp - holdStart
  const pct = Math.min((elapsed / props.holdMs) * 100, 100)
  progress.value = pct
  emit('progress', pct)

  if (elapsed >= props.holdMs) {
    completeHold()
    return
  }

  rafId = requestAnimationFrame(updateProgress)
}

function startHold() {
  if (props.disabled || isLit.value || isHolding.value) return

  isHolding.value = true
  progress.value = 0
  holdStart = performance.now()
  resetRaf()
  rafId = requestAnimationFrame(updateProgress)
}

function cancelHold() {
  if (!isHolding.value) return

  isHolding.value = false
  resetRaf()

  if (!isLit.value && progress.value < 100) {
    progress.value = 0
    emit('cancelled')
  }
}

function completeHold() {
  isHolding.value = false
  resetRaf()
  progress.value = 100
  isLit.value = true
  emit('completed')
}

onBeforeUnmount(() => {
  resetRaf()
})
</script>

<template>
  <div class="heart-lamp">
    <button
      type="button"
      class="lamp-button"
      :class="{ 'is-holding': isHolding, 'is-lit': isLit }"
      :disabled="disabled"
      @pointerdown.prevent="startHold"
      @pointerup="cancelHold"
      @pointerleave="cancelHold"
      @pointercancel="cancelHold"
      @touchstart.prevent="startHold"
      @touchend="cancelHold"
      @touchcancel="cancelHold"
      @mousedown.prevent="startHold"
      @mouseup="cancelHold"
      @mouseleave="cancelHold"
    >
      <span class="lamp-core" aria-hidden="true"></span>
      <span class="lamp-text">
        {{ isLit ? doneText : isHolding ? holdingText : idleText }}
      </span>
      <span class="progress-track" aria-hidden="true">
        <span class="progress-fill" :style="{ width: `${progress}%` }"></span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.heart-lamp {
  display: grid;
  place-items: center;
  margin-top: 12px;
}

.lamp-button {
  width: min(100%, 260px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid rgba(152, 106, 72, 0.36);
  background: radial-gradient(circle at 35% 30%, #fff6ea, #efdac6 55%, #dbbc9d);
  box-shadow: 0 10px 24px rgba(138, 100, 69, 0.22);
  color: #5b402d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.lamp-button.is-holding {
  transform: scale(0.992);
}

.lamp-button.is-lit {
  background: radial-gradient(circle at 35% 30%, #fff8db, #f2d28f 52%, #dcab58);
  box-shadow: 0 0 0 6px rgba(241, 194, 107, 0.22), 0 14px 32px rgba(133, 88, 40, 0.34);
}

.lamp-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lamp-core {
  width: 30%;
  max-width: 54px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(circle, #fff9ed, #ffd287 62%, #f0b762);
  box-shadow: 0 0 22px rgba(255, 210, 133, 0.45);
}

.lamp-text {
  font-size: 15px;
  font-weight: 600;
}

.progress-track {
  width: 80%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
  overflow: hidden;
}

.progress-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #f0b36f, #d98e49);
  width: 0%;
  transition: width 0.06s linear;
}
</style>
