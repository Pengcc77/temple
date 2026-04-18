<template>
  <PageShell
    aria-label="首頁"
    step="祥喜註生宮數位祈福"
    title="以一段小小祈願，向註生娘娘獻上祝福"
    subtitle="在等待的片刻，也能留下溫柔祈福。"
  >
    <SectionCard tone="soft" class="u-stack-sm u-center">
      <p class="u-muted">祥喜註生宮</p>
      <p class="intro-text">沿著簡短引導，靜心、祈願、收福，讓祝福安穩留在今天。</p>
    </SectionCard>

    <template #footer>
      <div class="u-stack-sm">
        <TempleButton variant="primary" @click="startBlessing">開始祈福</TempleButton>
        <TempleButton variant="secondary" @click="goToAbout">廟宇簡介</TempleButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PageShell from '../components/ui/PageShell.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import TempleButton from '../components/ui/TempleButton.vue'

const router = useRouter()

function startBlessing() {
  router.push('/wish')
}

function goToAbout() {
  router.push('/about')
}
</script>

<style scoped>
.intro-text {
  line-height: 1.75;
  color: var(--color-text-soft);
}
</style>

