<template>
  <main class="story-page" aria-label="識廟互動頁">
    <section class="story-shell">
      <header class="story-header">
        <p class="step-text">祈福旅程・識廟</p>
        <h1>認識祥喜註生宮</h1>
        <p class="subtitle">在片刻之間，讀一段廟史，也讀見地方守護的心意。</p>
      </header>

      <section class="progress-panel" aria-label="閱讀進度">
        <p class="progress-text">已閱讀 {{ viewedCount }}/3</p>
        <ol class="progress-dots">
          <li v-for="card in cards" :key="card.id" class="dot-item">
            <span class="dot" :class="{ 'is-read': readMap[card.id] }" aria-hidden="true"></span>
            <span class="dot-label">{{ card.title }}</span>
          </li>
        </ol>
      </section>

      <section class="story-cards" aria-label="宮廟故事卡">
        <article
          v-for="card in cards"
          :key="card.id"
          class="story-card"
          :class="{ 'is-open': openMap[card.id], 'is-read': readMap[card.id] }"
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
        </article>
      </section>

      <footer class="story-footer">
        <button
          v-if="allRead"
          type="button"
          class="collect-btn"
          @click="goNext"
        >
          收下這份故事
        </button>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cards = [
  {
    id: 'origin',
    title: '宮廟的起源',
    content:
      '祥喜註生宮位於新竹縣湖口鄉八德路二段592號，主祀註生娘娘。其起源可追溯至清同治年間，是台灣少數以註生娘娘為主神的重要信仰據點之一。',
  },
  {
    id: 'continuation',
    title: '香火的延續',
    content:
      '廟宇曾因年久失修倒塌，但地方信眾並未中斷信仰，曾將香火迎奉至民宅持續供奉。這份守護與敬意，讓信念在歲月中安穩延續。',
  },
  {
    id: 'today',
    title: '今日的祈願',
    content:
      '約在民國71年，祥喜註生宮於現址重建。如今人們來到此地祈求平安與新生祝福，在靜心參拜中，把感恩與祈願帶回生活日常。',
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

const viewedCount = computed(() => {
  return cards.filter((card) => readMap[card.id]).length
})

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
.story-page {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 20% 14%, rgba(255, 242, 224, 0.88), transparent 44%),
    radial-gradient(circle at 84% 82%, rgba(248, 227, 204, 0.75), transparent 40%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.story-shell {
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

.story-header {
  text-align: center;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.story-header h1 {
  margin: 10px 0 8px;
  font-size: 28px;
  line-height: 1.3;
  color: #4f3b2a;
}

.subtitle {
  margin: 0;
  color: #6f5845;
  line-height: 1.6;
  font-size: 15px;
}

.progress-panel {
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid rgba(162, 124, 91, 0.24);
  background: rgba(255, 248, 238, 0.7);
  padding: 12px;
}

.progress-text {
  margin: 0;
  font-size: 14px;
  color: #7a5e46;
  font-weight: 600;
}

.progress-dots {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.dot-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(160, 120, 84, 0.42);
  background: rgba(255, 255, 255, 0.86);
}

.dot.is-read {
  background: #d7a77a;
  border-color: #c88d5b;
  box-shadow: 0 0 0 3px rgba(215, 167, 122, 0.2);
}

.dot-label {
  color: #6a4f3a;
  font-size: 14px;
}

.story-cards {
  margin-top: 14px;
  display: grid;
  gap: 10px;
}

.story-card {
  border-radius: 14px;
  border: 1px solid rgba(158, 120, 88, 0.28);
  background: rgba(255, 248, 238, 0.88);
  overflow: hidden;
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
  color: #5e4734;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
}

.card-state {
  font-size: 13px;
  color: #8b6b52;
}

.card-content {
  padding: 0 14px 14px;
}

.card-content p {
  margin: 0;
  color: #684f3c;
  line-height: 1.75;
  font-size: 15px;
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

.story-footer {
  margin-top: auto;
  padding-top: 16px;
}

.collect-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
}

.collect-btn:active {
  transform: translateY(1px);
}

@media (max-width: 360px) {
  .story-header h1 {
    font-size: 24px;
  }
}
</style>
