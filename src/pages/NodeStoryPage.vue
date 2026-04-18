<template>
  <PageShell
    aria-label="識廟互動頁"
    step="祈福旅程・步驟 4"
    title="認識祥喜註生宮"
    subtitle="在一分鐘裡，讀見宮廟歷史與地方信念。"
  >
    <ProgressDots :current="4" :total="5" />

    <SectionCard tone="soft" class="u-stack-sm">
      <p class="u-muted">已閱讀 {{ viewedCount }}/3</p>
      <ol class="read-list">
        <li v-for="card in cards" :key="card.id">
          <span class="read-dot" :class="{ 'is-read': readMap[card.id] }" aria-hidden="true"></span>
          <span>{{ card.title }}</span>
        </li>
      </ol>
    </SectionCard>

    <div class="u-stack-sm">
      <SectionCard
        v-for="card in cards"
        :key="card.id"
        class="story-card"
        :class="{ 'is-read': readMap[card.id] }"
      >
        <button
          type="button"
          class="card-trigger"
          :aria-expanded="openMap[card.id] ? 'true' : 'false'"
          @click="toggleCard(card.id)"
        >
          <span class="card-title">{{ card.title }}</span>
          <span class="card-state">{{ openMap[card.id] ? '收起' : '展開' }}</span>
        </button>

        <Transition name="fade-slide">
          <div v-if="openMap[card.id]" class="card-content">
            <p>{{ card.content }}</p>
          </div>
        </Transition>
      </SectionCard>
    </div>

    <SectionCard tone="soft" class="closing-note">
      <p>走過這段簡短的廟史，也讓心慢慢安定下來。</p>
      <p>願這份理解，成為你今日祈願裡的一道溫柔光亮。</p>
    </SectionCard>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton v-if="allRead" variant="primary" @click="goNext">收下這份故事</TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'
import ProgressDots from '../components/ui/ProgressDots.vue'
import { storyCards } from '../data/storyCards'

const router = useRouter()
const cards = storyCards

const openMap = reactive({
  origin: false,
  continuation: false,
  today: false,
})

const readMap = reactive({
  origin: false,
  continuation: false,
  today: false,
})

const viewedCount = computed(() => cards.filter((card) => readMap[card.id]).length)
const allRead = computed(() => viewedCount.value === cards.length)

function toggleCard(id) {
  openMap[id] = !openMap[id]
  if (openMap[id]) {
    readMap[id] = true
  }
}

function goNext() {
  router.push('/result')
}

function goBack() {
  router.push('/journey/purify')
}
</script>

<style scoped>
.read-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.read-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-soft);
  font-size: var(--font-sm);
}

.read-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
}

.read-dot.is-read {
  background: #d7a77a;
  border-color: #c88d5b;
}

.story-card {
  padding: 0;
}

.story-card.is-read {
  border-color: rgba(188, 131, 84, 0.58);
}

.card-trigger {
  width: 100%;
  border: none;
  background: transparent;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text);
}

.card-title {
  font-size: 17px;
  font-weight: 600;
}

.card-state {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.card-content {
  padding: 0 14px 14px;
}

.card-content p {
  color: var(--color-text-soft);
  line-height: 1.85;
  font-size: 15px;
}

.closing-note {
  color: var(--color-text-soft);
  line-height: 1.8;
}

.closing-note p + p {
  margin-top: 8px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
