<template>
  <PageShell
    aria-label="廟宇簡介"
    step="祥喜註生宮"
    title="廟宇簡介"
    subtitle="以簡短的一頁，認識這座陪伴地方祈願的宮廟。"
  >
    <ProgressDots :current="0" :total="5" />

    <SectionCard class="u-stack-sm u-fade-in">
      <p class="label">宮廟簡介</p>
      <p class="desc">{{ templeInfo.description }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm u-fade-in" style="animation-delay: 40ms">
      <p class="label">主祀神明</p>
      <p class="value">{{ templeInfo.mainDeity }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm u-fade-in" style="animation-delay: 80ms">
      <p class="label">地點</p>
      <p class="value">{{ templeInfo.location }}</p>
    </SectionCard>

    <SectionCard class="u-stack-sm u-fade-in" style="animation-delay: 120ms">
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
import ProgressDots from '../components/ui/ProgressDots.vue'
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
  line-height: var(--line-copy-tight);
}

.desc {
  color: var(--color-text-soft);
  line-height: var(--line-copy);
  font-size: var(--font-md);
}

.wish-list {
  margin: 0;
  padding-left: 18px;
  color: var(--color-text-soft);
  line-height: var(--line-copy-tight);
}
</style>
