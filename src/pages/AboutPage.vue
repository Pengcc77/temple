<template>
  <PageShell
    aria-label="廟宇簡介"
    step="祥喜註生宮"
    title="廟宇簡介"
    subtitle="在這座安定的空間裡，感受地方信仰長久而溫柔的陪伴。"
  >
    <SectionCard class="u-stack-sm">
      <p class="label">宮廟簡介</p>
      <p class="desc">{{ templeInfo.description }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm">
      <p class="label">主祀神明</p>
      <p class="value">{{ templeInfo.mainDeity }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm">
      <p class="label">地點</p>
      <p class="value">{{ templeInfo.location }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm">
      <p class="label">信眾常見祈願</p>
      <ul class="wish-list">
        <li v-for="wish in commonWishes" :key="wish">{{ wish }}</li>
      </ul>
    </SectionCard>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" @click="goWish">開始祈福</TempleButton>
        <TempleButton variant="secondary" @click="goHome">回到首頁</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'
import { templeInfo } from '../data/templeInfo'
import { wishTypeLabelMap } from '../data/blessings'

const router = useRouter()

const commonWishes = computed(() => Object.values(wishTypeLabelMap))

function goWish() {
  router.push('/wish')
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.value {
  font-size: var(--font-lg);
  color: var(--color-text);
  font-weight: 600;
}

.desc {
  color: var(--color-text-soft);
  line-height: 1.75;
}

.wish-list {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-soft);
  line-height: 1.7;
}
</style>
