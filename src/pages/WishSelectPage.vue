<template>
  <PageShell
    aria-label="祈願選擇"
    step="祈福旅程・步驟 1"
    title="今日想獻上的祈願"
    subtitle="選擇一個此刻最想守護的心願。"
  >
    <ProgressDots :current="1" :total="5" />

    <div class="wish-list">
      <SectionCard
        v-for="(option, index) in options"
        :key="option"
        class="wish-item u-fade-in"
        :class="{ 'is-selected': selectedWish === option }"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <button type="button" class="wish-trigger" @click="selectWish(option)">
          <span>{{ option }}</span>
          <span class="wish-mark" aria-hidden="true">{{ selectedWish === option ? '已選' : '' }}</span>
        </button>
      </SectionCard>

      <SectionCard
        class="wish-item custom-wish-item u-fade-in"
        :class="{ 'is-selected': selectedWish === customOptionLabel }"
        :style="{ animationDelay: `${options.length * 50}ms` }"
      >
        <button type="button" class="wish-trigger" @click="selectWish(customOptionLabel)">
          <span>自訂心願</span>
          <span class="wish-mark" aria-hidden="true">{{ selectedWish === customOptionLabel ? '已選' : '' }}</span>
        </button>

        <div v-if="selectedWish === customOptionLabel" class="custom-input-wrap">
          <label class="custom-label" for="customWish">請寫下你的心願</label>
          <textarea
            id="customWish"
            v-model.trim="customWish"
            class="custom-input"
            rows="3"
            maxlength="40"
            placeholder="例如：願家人平安健康，日日安心"
          ></textarea>
          <p class="custom-count">{{ customWish.length }}/40</p>
        </div>
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
const customOptionLabel = '自訂心願'

const selectedWish = ref('')
const customWish = ref('')

const canContinue = computed(() => {
  if (!selectedWish.value) return false
  if (selectedWish.value === customOptionLabel) return customWish.value.trim().length > 0
  return true
})

function selectWish(option) {
  selectedWish.value = option
}

function continueToReminder() {
  if (!canContinue.value) return

  const finalWish = selectedWish.value === customOptionLabel ? customWish.value.trim() : selectedWish.value
  blessingStore.setSelectedWishType(finalWish)

  const messageMap = {
    '求順利生產': '願平安順產，母子安康。',
    '求寶寶健康平安': '願寶寶健康平安，福澤綿長。',
    '感謝娘娘庇佑': '願感恩常在，日日安穩。',
  }

  blessingStore.setBlessingMessage(messageMap[finalWish] || '願心願被溫柔守護，平安常伴。')
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
  padding: var(--space-3);
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-md);
  font-weight: 600;
}

.wish-mark {
  min-width: 38px;
  height: 24px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  display: grid;
  place-items: center;
  color: #8a5d33;
  font-size: var(--font-xs);
}

.custom-wish-item {
  padding-bottom: var(--space-2);
}

.custom-input-wrap {
  padding: 0 var(--space-3) var(--space-2);
}

.custom-label {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text-soft);
  font-size: var(--font-sm);
}

.custom-input {
  width: 100%;
  border: 1px solid var(--color-border-strong);
  border-radius: 12px;
  background: rgba(255, 252, 247, 0.92);
  padding: 10px 12px;
  color: var(--color-text);
  font-size: var(--font-md);
  line-height: var(--line-copy-tight);
  resize: none;
}

.custom-input:focus {
  outline: 2px solid rgba(195, 142, 94, 0.34);
  outline-offset: 1px;
}

.custom-count {
  margin-top: 6px;
  text-align: right;
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}
</style>
