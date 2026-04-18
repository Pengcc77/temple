<template>
  <PageShell
    aria-label="祈願選擇"
    step="祈福旅程?步驟 1"
    title="今日想獻上的祈願"
    subtitle="選擇一個此刻最想守護的心願。"
  >
    <ProgressDots :current="1" :total="5" />

    <div class="wish-list">
      <SectionCard
        v-for="option in options"
        :key="option"
        class="wish-item"
        :class="{ 'is-selected': selectedWish === option }"
      >
        <button type="button" class="wish-trigger" @click="selectWish(option)">
          <span>{{ option }}</span>
          <span class="wish-mark" aria-hidden="true">{{ selectedWish === option ? '?' : '' }}</span>
        </button>
      </SectionCard>
    </div>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" :disabled="!canContinue" @click="continueToReminder">繼續</TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlessingStore } from '../stores/blessingStore'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'
import ProgressDots from '../components/ui/ProgressDots.vue'

const router = useRouter()
const blessingStore = useBlessingStore()

const options = ['求順利生產', '求寶寶健康平安', '感謝娘娘庇佑']

const selectedWish = ref('')
const canContinue = computed(() => selectedWish.value !== '')

function selectWish(option) {
  selectedWish.value = option
}

function continueToReminder() {
  if (!canContinue.value) return

  blessingStore.setSelectedWishType(selectedWish.value)

  const messageMap = {
    '求順利生產': '願平安順產，母子安康。',
    '求寶寶健康平安': '願寶寶健康平安，福澤綿長。',
    '感謝娘娘庇佑': '願感恩常在，日日安穩。',
  }

  blessingStore.setBlessingMessage(messageMap[selectedWish.value] || '願心安定，福至平安。')
  router.push('/reminder')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.wish-list {
  display: grid;
  gap: var(--space-2);
}

.wish-item {
  padding: 0;
}

.wish-item.is-selected {
  border-color: rgba(188, 131, 84, 0.72);
  box-shadow: var(--shadow-soft);
  background: linear-gradient(180deg, #fbecd8 0%, #f6dfc1 100%);
}

.wish-trigger {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  padding: 14px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
}

.wish-mark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  display: grid;
  place-items: center;
  color: #8a5d33;
  font-size: 13px;
}
</style>

