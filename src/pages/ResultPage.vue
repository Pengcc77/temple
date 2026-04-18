<template>
  <PageShell
    aria-label="祈福結果"
    step="祈福旅程・步驟 5"
    title="你的今日祝福"
    subtitle="願這份祝福，陪你走過接下來的每一天。"
  >
    <ProgressDots :current="5" :total="5" />

    <div ref="blessingCaptureRef" class="blessing-capture">
      <article class="blessing-card u-fade-in" aria-label="祝福卡">
        <span class="card-halo" aria-hidden="true"></span>
        <span class="guardian-seal" aria-hidden="true">護</span>
        <img class="card-figure" :src="goddessFigure" alt="" aria-hidden="true" />

        <div class="card-head">
          <p class="temple-name">祥喜註生宮</p>
          <p class="card-subtitle">註生娘娘祝福卡</p>
        </div>

        <div class="card-body">
          <p class="blessing-line">{{ displayBlessingMessage }}</p>
          <p class="context-line">{{ contextLine }}</p>
        </div>

        <div class="card-meta">
          <p class="wish-direction">祈願方向：{{ displayWishLabel }}</p>
          <p class="today-date">今日日期：{{ todayLabel }}</p>
        </div>

        <p class="card-closing">願平安與祝福常伴左右</p>
      </article>
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
import goddessFigure from '../assets/01.png'

const router = useRouter()
const { state, resetBlessingJourney } = useBlessingStore()

const blessingCaptureRef = ref(null)
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
  if (isSaving.value || !blessingCaptureRef.value) return

  isSaving.value = true
  downloadError.value = false

  try {
    const target = blessingCaptureRef.value
    const rect = target.getBoundingClientRect()

    const dataUrl = await toPng(target, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#fffaf2',
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
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
.blessing-capture {
  margin-top: var(--space-1);
  margin-inline: auto;
  width: min(100%, 350px);
  padding: 10px;
}

.blessing-card {
  position: relative;
  margin-top: 0;
  padding: 18px 18px 16px;
  width: min(100%, 330px);
  margin-inline: auto;
  aspect-ratio: 4 / 5;
  min-height: 410px;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(173, 130, 95, 0.28);
  background: linear-gradient(180deg, #fffcf8 0%, #fdf5ea 100%);
  box-shadow: 0 16px 30px rgba(118, 81, 50, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  text-align: center;
}

.guardian-seal {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(170, 124, 82, 0.5);
  color: rgba(147, 102, 64, 0.86);
  font-size: 16px;
  display: grid;
  place-items: center;
  background: rgba(255, 245, 230, 0.82);
  z-index: 3;
}

.card-halo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at 20% 14%, rgba(255, 233, 195, 0.48), transparent 34%),
    radial-gradient(circle at 82% 88%, rgba(247, 223, 187, 0.36), transparent 40%),
    repeating-linear-gradient(
      135deg,
      rgba(180, 135, 88, 0.035),
      rgba(180, 135, 88, 0.035) 6px,
      transparent 6px,
      transparent 16px
    );
}

.card-head,
.card-body,
.card-meta,
.card-closing {
  position: relative;
  z-index: 2;
}

.card-head {
  margin-top: 8px;
}

.card-figure {
  position: absolute;
  left: 10px;
  bottom: 12px;
  width: 74px;
  height: auto;
  opacity: 0.26;
  z-index: 1;
  pointer-events: none;
}

.temple-name {
  color: #7a5638;
  font-size: var(--font-sm);
  letter-spacing: 0.09em;
}

.card-subtitle {
  margin-top: 4px;
  color: var(--color-text-muted);
  font-size: var(--font-xs);
  letter-spacing: 0.08em;
}

.wish-direction {
  color: var(--color-text-soft);
  font-size: var(--font-sm);
  line-height: var(--line-copy-tight);
}

.context-line {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  line-height: var(--line-copy-tight);
  font-size: var(--font-sm);
}

.blessing-line {
  margin-top: var(--space-3);
  max-width: 11ch;
  margin-inline: auto;
  color: #5f432e;
  line-height: 1.62;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.01em;
  word-break: break-word;
}

.today-date {
  color: var(--color-text-muted);
  font-size: var(--font-sm);
}

.card-meta {
  margin-top: auto;
  display: grid;
  gap: 6px;
}

.card-closing {
  margin-top: var(--space-2);
  color: #8a694f;
  font-size: var(--font-sm);
  letter-spacing: 0.02em;
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
</style>
