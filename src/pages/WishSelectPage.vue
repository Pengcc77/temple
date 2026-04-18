<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const blessingStore = useBlessingStore()

const options = [
  '求順利生產',
  '求寶寶健康平安',
  '感謝娘娘庇佑',
]

const selectedWish = ref('')
const canContinue = computed(() => selectedWish.value !== '')

function selectWish(option) {
  selectedWish.value = option
}

function continueToReminder() {
  if (!canContinue.value) return

  if (typeof blessingStore.setSelectedWishType === 'function') {
    blessingStore.setSelectedWishType(selectedWish.value)
  } else {
    blessingStore.setWishDirection(selectedWish.value)
  }

  const messageMap = {
    '求順利生產': '願一切平順，母子安康',
    '求寶寶健康平安': '願寶寶健康平安，福澤綿長',
    '感謝娘娘庇佑': '願感恩長存，日日安穩',
  }

  if (typeof blessingStore.setBlessingMessage === 'function') {
    blessingStore.setBlessingMessage(messageMap[selectedWish.value] || '願心安定，福至平安')
  }

  router.push('/reminder')
}
</script>

<template>
  <main class="wish-page" aria-label="祈願方向選擇">
    <section class="wish-card">
      <header class="wish-header">
        <p class="step-text">祈福旅程・步驟 1</p>
        <h1>今日想獻上的祈願</h1>
      </header>

      <section class="wish-list" aria-label="祈願選項">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          class="wish-item"
          :class="{ 'is-selected': selectedWish === option }"
          @click="selectWish(option)"
        >
          <span class="wish-label">{{ option }}</span>
          <span class="wish-mark" aria-hidden="true">✓</span>
        </button>
      </section>

      <footer class="wish-footer">
        <button
          type="button"
          class="continue-btn"
          :disabled="!canContinue"
          @click="continueToReminder"
        >
          繼續
        </button>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.wish-page {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 22% 12%, rgba(255, 242, 223, 0.85), transparent 44%),
    radial-gradient(circle at 80% 85%, rgba(247, 226, 202, 0.7), transparent 38%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.wish-card {
  width: min(100%, 390px);
  min-height: calc(100dvh - 40px);
  border-radius: 20px;
  padding: 22px 18px 18px;
  background: rgba(255, 251, 245, 0.84);
  border: 1px solid rgba(173, 128, 90, 0.2);
  box-shadow:
    0 14px 30px rgba(112, 82, 58, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
}

.wish-header {
  text-align: center;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.wish-header h1 {
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 1.3;
  color: #4f3b2a;
}

.wish-list {
  margin-top: 20px;
  display: grid;
  gap: 12px;
}

.wish-item {
  border: 1px solid rgba(158, 120, 88, 0.3);
  border-radius: 16px;
  background: rgba(255, 248, 238, 0.88);
  color: #5e4734;
  min-height: 64px;
  width: 100%;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.14s ease, border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.wish-item:active {
  transform: translateY(1px);
}

.wish-label {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
}

.wish-mark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 13px;
  color: transparent;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(158, 120, 88, 0.28);
}

.wish-item.is-selected {
  border-color: rgba(188, 131, 84, 0.72);
  background: linear-gradient(180deg, #fbecd8 0%, #f6dfc1 100%);
  box-shadow: 0 8px 18px rgba(144, 96, 56, 0.2);
}

.wish-item.is-selected .wish-mark {
  color: #8a5d33;
  background: rgba(255, 244, 225, 0.96);
  border-color: rgba(188, 131, 84, 0.65);
}

.wish-footer {
  margin-top: auto;
  padding-top: 16px;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 251, 245, 0.96), rgba(255, 251, 245, 0.66), transparent);
}

.continue-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
  transition: transform 0.14s ease, opacity 0.2s ease;
}

.continue-btn:active {
  transform: translateY(1px);
}

.continue-btn:disabled {
  opacity: 0.45;
  box-shadow: none;
}

@media (max-width: 360px) {
  .wish-header h1 {
    font-size: 24px;
  }

  .wish-label {
    font-size: 16px;
  }
}
</style>
