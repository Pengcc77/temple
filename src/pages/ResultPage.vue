<template>
  <main class="result-page" aria-label="祈福結果頁">
    <section class="result-shell">
      <header class="result-header">
        <p class="step-text">祈福旅程・完成</p>
        <h1>你的今日祝福</h1>
      </header>

      <article ref="blessingCardRef" class="blessing-card" aria-label="祝福卡">
        <p class="temple-name">{{ templeName }}</p>
        <p class="wish-direction">祈願：{{ displayWishType }}</p>
        <p class="blessing-line">{{ displayBlessingMessage }}</p>
        <p class="today-date">日期：{{ todayLabel }}</p>
      </article>

      <p v-if="downloadError" class="download-error">
        目前無法直接下載，請稍後再試。
      </p>

      <footer class="result-footer">
        <button
          type="button"
          class="btn btn-save"
          :disabled="isSaving"
          @click="saveImage"
        >
          {{ isSaving ? '正在準備圖片...' : '儲存祝福卡' }}
        </button>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toPng } from 'html-to-image'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const { state, resetBlessingJourney } = useBlessingStore()

const blessingCardRef = ref(null)
const isSaving = ref(false)
const downloadError = ref(false)

const templeName = '祥喜註生宮'
const fallbackWishType = '願寶寶健康平安'
const fallbackBlessing = '願心安定，福至平安'

const blessingsByWish = {
  '求順利生產': [
    '願平安順產，母子安康。',
    '願身心安穩，迎來平順喜悅。',
  ],
  '求寶寶健康平安': [
    '願寶寶健康平安，日日被溫柔守護。',
    '願新生平穩成長，福澤常伴左右。',
  ],
  '感謝娘娘庇佑': [
    '願感恩常在，心境清明而安定。',
    '願善念延續，日日平和且圓滿。',
  ],
}

const randomBlessing = ref('')

function pickRandomBlessing(wishType) {
  const pool = blessingsByWish[wishType] || [fallbackBlessing]
  return pool[Math.floor(Math.random() * pool.length)]
}

const displayWishType = computed(() => {
  return state.selectedWishType?.trim() || fallbackWishType
})

const displayBlessingMessage = computed(() => {
  const fromStore = state.blessingMessage?.trim()
  if (fromStore) return fromStore

  if (!randomBlessing.value) {
    randomBlessing.value = pickRandomBlessing(displayWishType.value)
  }
  return randomBlessing.value || fallbackBlessing
})

const todayLabel = computed(() => {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
})

function makeFileName() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `xiangxi-blessing-card-${y}-${m}-${d}.png`
}

async function saveImage() {
  if (isSaving.value || !blessingCardRef.value) return

  isSaving.value = true
  downloadError.value = false

  try {
    const dataUrl = await toPng(blessingCardRef.value, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#fffaf2',
    })

    const fileName = makeFileName()
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = fileName
    link.rel = 'noopener'
    link.click()

    // Fallback note: some mobile browsers may ignore download attribute.
    // In that case opening image directly can still allow user long-press save.
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        window.open(dataUrl, '_blank', 'noopener')
      }
    }, 350)
  } catch (error) {
    downloadError.value = true
    console.error('Failed to save blessing card image:', error)
  } finally {
    isSaving.value = false
  }
}

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
    radial-gradient(circle at 18% 15%, rgba(255, 243, 226, 0.94), transparent 42%),
    radial-gradient(circle at 82% 82%, rgba(250, 228, 206, 0.78), transparent 38%),
    linear-gradient(165deg, #f7efe3 0%, #ebdfcd 100%);
}

.result-shell {
  width: min(100%, 390px);
  min-height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
}

.result-header {
  text-align: center;
  margin-top: 8px;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.result-header h1 {
  margin: 10px 0 0;
  font-size: 29px;
  line-height: 1.28;
  color: #4f3b2a;
}

.blessing-card {
  margin-top: 20px;
  padding: 20px 18px;
  border-radius: 22px;
  border: 1px solid rgba(160, 119, 84, 0.26);
  background:
    linear-gradient(180deg, rgba(255, 252, 247, 0.92), rgba(255, 246, 236, 0.9)),
    radial-gradient(circle at 20% 18%, rgba(255, 244, 223, 0.8), transparent 36%);
  box-shadow:
    0 18px 34px rgba(118, 81, 50, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  text-align: center;
}

.temple-name {
  margin: 0;
  color: #866146;
  font-size: 14px;
  letter-spacing: 0.08em;
}

.wish-direction {
  margin: 14px 0 0;
  color: #5a4330;
  font-size: 18px;
  font-weight: 600;
}

.blessing-line {
  margin: 14px 0 0;
  color: #6b5240;
  line-height: 1.8;
  font-size: 16px;
}

.today-date {
  margin: 14px 0 0;
  color: #8a6c56;
  font-size: 14px;
}

.download-error {
  margin: 10px 0 0;
  text-align: center;
  color: #a65b40;
  font-size: 14px;
}

.result-footer {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding-top: 18px;
}

.btn {
  width: 100%;
  min-height: 48px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
}

.btn-save {
  border: 1px solid rgba(158, 120, 88, 0.36);
  color: #6a4f3a;
  background: rgba(255, 249, 241, 0.95);
}

.btn-save:disabled {
  opacity: 0.65;
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
