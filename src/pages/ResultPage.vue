<template>
  <PageShell
    aria-label="祈福結果"
    step="祈福旅程・步驟 5"
    title="你的今日祝福"
    subtitle="願這份祝福，陪你走過接下來的每一天。"
  >
    <ProgressDots :current="5" :total="5" />

    <article ref="blessingCardRef" class="blessing-card u-fade-in" aria-label="祝福卡">
      <span class="guardian-seal" aria-hidden="true">護</span>
      <p class="temple-name">祥喜註生宮</p>
      <p class="wish-direction">祈願方向：{{ displayWishLabel }}</p>
      <p class="context-line">{{ contextLine }}</p>
      <p class="blessing-line">{{ displayBlessingMessage }}</p>
      <p class="today-date">今日日期：{{ todayLabel }}</p>
    </article>
    <div class="blessing-figure-wrap u-fade-in" aria-hidden="true">
      <img class="figure" :src="elderFigure" alt="" />
    </div>

    <p v-if="downloadError" class="download-error">儲存失敗，請再試一次或改用截圖保存。</p>

    <template #footer>
      <div class="u-stack-sm">
        <div class="download-tip">
          <p>先按「儲存祝福卡」，等待畫面完成。</p>
          <p>若手機未直接下載，會開啟圖片頁，請長按圖片後儲存。</p>
        </div>
        <TempleButton
          variant="primary"
          :disabled="isSaving"
          :loading="isSaving"
          loading-text="儲存中..."
          @click="saveImage"
        >
          儲存祝福卡
        </TempleButton>
        <TempleButton variant="secondary" @click="prayAgain">再次祈福</TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
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
import elderFigure from '../assets/02.png'

const router = useRouter()
const { state, resetBlessingJourney } = useBlessingStore()

const blessingCardRef = ref(null)
const isSaving = ref(false)
const downloadError = ref(false)
const randomBlessing = ref('')

const fallbackWishType = 'babyHealth'

const contextLineMap = {
  safeBirth: '願迎接新生命的每一步，都平安、安穩、圓滿。',
  babyHealth: '願孩子在守護與祝福裡，健康長大，日日安好。',
  gratitude: '願感恩的心繼續照亮往後的日子，平安常伴。',
  familySupport: '願一家彼此扶持，將溫柔陪伴化作安定力量。',
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

const contextLine = computed(() => contextLineMap[wishType.value] || contextLineMap[fallbackWishType])

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

function goBack() {
  router.push('/journey/story')
}
</script>

<style scoped>
.blessing-card {
  position: relative;
  margin-top: var(--space-2);
  padding: 22px 18px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, rgba(255, 252, 247, 0.92), rgba(255, 246, 236, 0.9)),
    radial-gradient(circle at 20% 18%, rgba(255, 244, 223, 0.8), transparent 36%);
  box-shadow: 0 18px 34px rgba(118, 81, 50, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.85);
  text-align: center;
}

.guardian-seal {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(170, 124, 82, 0.5);
  color: rgba(147, 102, 64, 0.86);
  font-size: 15px;
  display: grid;
  place-items: center;
  background: rgba(255, 245, 230, 0.75);
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
  line-height: var(--line-title);
}

.context-line {
  margin-top: 10px;
  color: var(--color-text-muted);
  line-height: var(--line-copy-tight);
  font-size: var(--font-sm);
}

.blessing-line {
  margin-top: var(--space-3);
  color: var(--color-text-soft);
  line-height: var(--line-copy);
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
  line-height: var(--line-copy-tight);
}

.download-tip p + p {
  margin-top: 4px;
}

.blessing-figure-wrap {
  margin-top: var(--space-2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.figure {
  width: 92px;
  max-width: 28vw;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(120, 84, 56, 0.14));
}
</style>
