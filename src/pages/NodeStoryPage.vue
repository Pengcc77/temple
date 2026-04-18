<template>
  <PageShell
    aria-label="識廟互動頁"
    step="祈福旅程?步驟 4"
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

    <template #footer>
      <TempleButton v-if="allRead" variant="primary" @click="goNext">收下這份故事</TempleButton>
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

const router = useRouter()

const cards = [
  {
    id: 'origin',
    title: '宮廟的起源',
    content:
      '祥喜註生宮位於新竹縣湖口鄉八德路二段592號，主祀註生娘娘。起源可追溯至清同治年間，是台灣少數以註生娘娘為主神的宮廟之一。',
  },
  {
    id: 'continuation',
    title: '香火的延續',
    content:
      '廟宇曾因年久失修倒塌，地方信眾仍將香火迎奉至民宅持續供奉。這份守護讓信仰沒有中斷，靜靜走過歲月。',
  },
  {
    id: 'today',
    title: '今日的祈願',
    content:
      '約在民國71年左右，宮廟重建於現址。如今人們來此祈求平安與新生祝福，將感恩與善意帶回日常。',
  },
]

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
  const hasBlessingRoute = router.getRoutes().some((route) => route.path === '/journey/blessing')
  router.push(hasBlessingRoute ? '/journey/blessing' : '/result')
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
  line-height: 1.75;
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

