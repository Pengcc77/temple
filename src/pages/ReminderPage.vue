<template>
  <PageShell
    aria-label="參拜提醒"
    step="祈福旅程・步驟 2"
    title="參拜前的小提醒"
    subtitle="以安靜的心，讓祈福更貼近初心。"
  >
    <ProgressDots :current="2" :total="5" />

    <div class="u-stack-sm">
      <SectionCard v-for="(tip, index) in tips" :key="tip" class="u-fade-in" :style="{ animationDelay: `${index * 50}ms` }">
        <p class="tip-text">{{ tip }}</p>
      </SectionCard>
    </div>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" @click="startBlessing">開始今日祈福</TempleButton>
        <TempleButton variant="secondary" @click="goBack">返回上一頁</TempleButton>
      </div>
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
  '參拜時保持心靜，放慢腳步。',
  '依廟方動線參拜，順暢動線。',
  '若對供品或儀式有疑問，可詢問廟方人員。',
]

function startBlessing() {
  router.push('/journey/purify')
}

function goBack() {
  router.push('/wish')
}
</script>

<style scoped>
.tip-text {
  line-height: var(--line-copy);
  color: var(--color-text-soft);
  font-size: var(--font-md);
}
</style>
