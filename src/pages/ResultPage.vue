<template>
  <main class="result-page" aria-label="祈福結果頁">
    <section class="result-shell">
      <header class="result-header">
        <p class="step-text">祈福旅程・完成</p>
        <h1>你的今日祝福</h1>
      </header>

      <article class="blessing-card" aria-label="祝福卡">
        <p class="temple-name">{{ templeName }}</p>
        <p class="wish-direction">{{ finalWishDirection }}</p>
        <p class="blessing-line">{{ finalBlessingLine }}</p>
        <p class="today-date">{{ todayLabel }}</p>
      </article>

      <footer class="result-footer">
        <button type="button" class="btn btn-primary" @click="prayAgain">
          再次祈福
        </button>
        <button type="button" class="btn btn-secondary" @click="goHome">
          回到首頁
        </button>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const { state, resetBlessingJourney } = useBlessingStore()

const templeName = '鹿港天后宮・註生娘娘殿'

const blessingById = {
  'peaceful-heart': '願心安定，福至平安',
  'family-harmony': '願家和同心，日常安穩',
  'new-life': '願新生平順，福蔭常在',
}

const finalWishDirection = computed(() => {
  const wish = state.wishDirection?.trim()
  return wish ? `祈願方向：${wish}` : '祈願方向：願寶寶健康平安'
})

const finalBlessingLine = computed(() => {
  return blessingById[state.selectedBlessingId] || '願心安定，福至平安'
})

const todayLabel = computed(() => {
  const now = new Date()
  return `今日日期：${new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)}`
})

function prayAgain() {
  resetBlessingJourney()
  router.push('/')
}

function goHome() {
  resetBlessingJourney()
  router.push('/')
}
</script>

<style scoped>
.result-page {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 24% 12%, rgba(255, 242, 223, 0.9), transparent 44%),
    radial-gradient(circle at 84% 84%, rgba(248, 228, 204, 0.75), transparent 38%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.result-shell {
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

.result-header {
  text-align: center;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.result-header h1 {
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 1.3;
  color: #4f3b2a;
}

.blessing-card {
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid rgba(158, 120, 88, 0.3);
  background: rgba(255, 248, 238, 0.9);
  padding: 18px 16px;
  box-shadow: 0 10px 20px rgba(125, 89, 60, 0.12);
}

.temple-name {
  margin: 0;
  color: #8a664b;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.wish-direction {
  margin: 12px 0 0;
  color: #5a4330;
  font-size: 17px;
  font-weight: 600;
}

.blessing-line {
  margin: 12px 0 0;
  color: #6b5240;
  line-height: 1.7;
}

.today-date {
  margin: 14px 0 0;
  color: #8a6c56;
  font-size: 14px;
}

.result-footer {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding-top: 18px;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 251, 245, 0.96), rgba(255, 251, 245, 0.66), transparent);
}

.btn {
  width: 100%;
  min-height: 48px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
}

.btn-primary {
  border: none;
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
}

.btn-secondary {
  border: 1px solid rgba(158, 120, 88, 0.35);
  color: #6a4f3a;
  background: rgba(255, 248, 238, 0.9);
}

.btn:active {
  transform: translateY(1px);
}

@media (max-width: 360px) {
  .result-header h1 {
    font-size: 24px;
  }
}
</style>
