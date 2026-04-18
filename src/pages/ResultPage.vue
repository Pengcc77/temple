<template>
  <PageShell
    aria-label="祈福結果頁"
    step="祈福旅程・完成"
    title="你的今日祝福"
    subtitle="願這份祝福安穩地留在你的日常裡。"
  >
    <ProgressDots :current="5" :total="5" />

    <article ref="blessingCardRef" class="blessing-card" aria-label="祝福卡">
      <p class="temple-name">祥喜註生宮</p>
      <p class="wish-direction">祈願：{{ displayWishLabel }}</p>
      <p class="context-line">{{ contextLine }}</p>
      <p class="blessing-line">{{ displayBlessingMessage }}</p>
      <p class="today-date">日期：{{ todayLabel }}</p>
    </article>

    <p v-if="downloadError" class="download-error">目前無法直接下載，請稍後再試。</p>

    <template #footer>
      <div class="u-stack-sm">
        <p class="download-tip">建議先儲存祝福卡，再分享給家人留念。</p>
        <TempleButton
          variant="secondary"
          :disabled="isSaving"
          :loading="isSaving"
          loading-text="正在準備圖片..."
          @click="saveImage"
        >
          儲存祝福卡
        </TempleButton>
        <TempleButton variant="primary" @click="prayAgain">再次祈福</TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
        <TempleButton variant="secondary" @click="goHome">回到首頁</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toPng } from 'html-to-image'
import { useBlessingStore } from '../stores/blessingStore'
import { getRandomBlessing, wishTypeLabelMap } from '../data/blessings'
import PageShell from '../components/ui/PageShell.vue'
import ProgressDots from '../components/ui/ProgressDots.vue'
import TempleButton from '../components/ui/TempleButton.vue'

const router = useRouter()
const { state, resetBlessingJourney } = useBlessingStore()

const blessingCardRef = ref(null)
const isSaving = ref(false)
const downloadError = ref(false)
const randomBlessing = ref('')

const fallbackWishType = 'babyHealth'

const contextLineMap = {
  safeBirth: '願你在等待與準備裡，感受到平穩與安心。',
  babyHealth: '願孩子在祝福中平安長成，日日都被溫柔守護。',
  gratitude: '願感謝的心意延續，化作日常裡的安定與喜悅。',
  familySupport: '願家人彼此扶持，讓每一步都更踏實溫暖。',
}

function resolveWishType() {
  const selected = state.selectedWishType?.trim()
  if (!selected) return fallbackWishType

  if (wishTypeLabelMap[selected]) return selected

  const matched = Object.entries(wishTypeLabelMap).find(([, label]) => label === selected)
  return matched ? matched[0] : fallbackWishType
}

const wishType = computed(() => resolveWishType())

const displayWishLabel = computed(() => {
  const selected = state.selectedWishType?.trim()
  if (!selected) return wishTypeLabelMap[fallbackWishType]

  if (wishTypeLabelMap[selected]) return wishTypeLabelMap[selected]
  return selected
})

const contextLine = computed(() => {
  return contextLineMap[wishType.value] || contextLineMap[fallbackWishType]
})

const displayBlessingMessage = computed(() => {
  const fromStore = state.blessingMessage?.trim()
  if (fromStore) return fromStore

  if (!randomBlessing.value) {
    randomBlessing.value = getRandomBlessing(wishType.value)
  }
  return randomBlessing.value
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

function goBack() {
  router.push('/journey/story')
}
</script>

<style scoped>
.blessing-card {
  margin-top: var(--space-2);
  padding: 20px 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, rgba(255, 252, 247, 0.92), rgba(255, 246, 236, 0.9)),
    radial-gradient(circle at 20% 18%, rgba(255, 244, 223, 0.8), transparent 36%);
  box-shadow: 0 18px 34px rgba(118, 81, 50, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.85);
  text-align: center;
}

.temple-name {
  color: #866146;
  font-size: var(--font-sm);
  letter-spacing: 0.08em;
}

.wish-direction {
  margin-top: var(--space-3);
  color: var(--color-text);
  font-size: var(--font-lg);
  font-weight: 600;
}

.context-line {
  margin-top: 10px;
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: var(--font-sm);
}

.blessing-line {
  margin-top: var(--space-3);
  color: var(--color-text-soft);
  line-height: 1.8;
  font-size: var(--font-md);
}

.today-date {
  margin-top: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-sm);
}

.download-error {
  text-align: center;
  color: #a65b40;
  font-size: var(--font-sm);
}

.download-tip {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-sm);
}
</style>
