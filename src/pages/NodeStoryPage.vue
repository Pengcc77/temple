<template>
  <PageShell
    aria-label="認識祥喜註生宮"
    step="祈福旅程・步驟 4"
    title="認識祥喜註生宮"
    subtitle="在一分鐘內，輕輕讀完這座宮廟的由來與信念。"
  >
    <ProgressDots :current="4" :total="5" />

    <SectionCard tone="soft" class="u-stack-sm u-fade-in">
      <p class="u-muted">閱讀進度 {{ viewedCount }}/3</p>
      <ol class="read-list">
        <li v-for="card in cards" :key="card.id">
          <span class="read-dot" :class="{ 'is-read': readMap[card.id] }" aria-hidden="true"></span>
          <span>{{ card.title }}</span>
        </li>
      </ol>
    </SectionCard>

    <div class="u-stack-sm">
      <SectionCard
        v-for="(card, index) in cards"
        :key="card.id"
        class="story-card u-fade-in"
        :class="{ 'is-read': readMap[card.id] }"
        :style="{ animationDelay: `${index * 55}ms` }"
      >
        <button
          type="button"
          class="card-trigger"
          :aria-expanded="openMap[card.id] ? 'true' : 'false'"
          @click="toggleCard(card.id)"
        >
          <span class="card-title">{{ card.title }}</span>
          <span class="card-state">{{ openMap[card.id] ? '收合' : '展開' }}</span>
        </button>

        <Transition name="fade-slide">
          <div v-if="openMap[card.id]" class="card-content">
            <p>{{ card.content }}</p>
          </div>
        </Transition>
      </SectionCard>
    </div>

    <SectionCard tone="soft" class="closing-note u-fade-in" style="animation-delay: 140ms">
      <p>每一份心意，都是與地方文化相遇的溫柔時刻。</p>
      <p>願這段閱讀，讓你帶著更安定的心，走向今日祝福。</p>
    </SectionCard>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" :disabled="!allRead" @click="goNext">收下這份故事</TempleButton>
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
  font-size: var(--font-md);
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
  padding: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text);
}

.card-title {
  font-size: var(--font-lg);
  font-weight: 600;
}

.card-state {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.card-content {
  padding: 0 var(--space-3) var(--space-4);
}

.card-content p {
  max-width: 30ch;
  margin: 0 auto;
  text-align: left;
  color: var(--color-text-soft);
  line-height: 1.9;
  font-size: var(--font-md);
  letter-spacing: 0.01em;
}

.closing-note {
  color: var(--color-text-soft);
  line-height: var(--line-copy-tight);
  font-size: var(--font-md);
}

.closing-note p + p {
  margin-top: 8px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity var(--transition-soft), transform var(--transition-soft);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
