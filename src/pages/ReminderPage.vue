<template>
  <PageShell
    aria-label="參拜提醒"
    step="祈福旅程?步驟 2"
    title="參拜前的小提醒"
    subtitle="以安靜的心，讓祈福更貼近初心。"
  >
    <ProgressDots :current="2" :total="5" />

    <div class="u-stack-sm">
      <SectionCard v-for="tip in tips" :key="tip">
        <p class="tip-text">{{ tip }}</p>
      </SectionCard>
    </div>

    <template #footer>
      <TempleButton variant="primary" @click="startBlessing">開始今日祈福</TempleButton>
    </template>
  </PageShell>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'
import ProgressDots from '../components/ui/ProgressDots.vue'

const router = useRouter()

const tips = [
  '參拜時請保持心靜，放慢步伐。',
  '請依廟方動線參拜，保持現場安寧。',
  '若對供品或儀式有疑問，可詢問廟方人員。',
]

function startBlessing() {
  router.push('/journey/purify')
}
</script>

<style scoped>
.tip-text {
  line-height: 1.75;
  color: var(--color-text-soft);
}
</style>

