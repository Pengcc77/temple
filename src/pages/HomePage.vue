<template>
  <PageShell
    aria-label="首頁"
    step="祥喜註生宮數位祈福"
    title="以一段小小祈願，向註生娘娘獻上祝福"
    subtitle="在等待的片刻，也能留下溫柔祈福。"
  >
    <ProgressDots :current="0" :total="5" />

    <SectionCard tone="soft" class="u-stack-sm u-center u-fade-in">
      <div class="hero-figures" aria-hidden="true">
        <img class="hero-figure" :src="goddessFigure" alt="" />
        <img class="hero-figure" :src="elderFigure" alt="" />
      </div>
      <p class="temple-name">祥喜註生宮</p>
      <p class="intro-text">沿著簡短引導，靜心、祈願、收福，讓祝福安穩留在今天。</p>
      <p class="onsite-tip">約 3 分鐘完成，建議手機靜音體驗。</p>
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
import ProgressDots from '../components/ui/ProgressDots.vue'
import goddessFigure from '../assets/01.png'
import elderFigure from '../assets/02.png'

const router = useRouter()

function startBlessing() {
  router.push('/wish')
}

function goToAbout() {
  router.push('/about')
}
</script>

<style scoped>
.temple-name {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
}

.hero-figures {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 10px;
}

.hero-figure {
  width: 116px;
  max-width: 34vw;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(120, 84, 56, 0.16));
}

.intro-text {
  line-height: var(--line-copy);
  color: var(--color-text-soft);
  font-size: var(--font-md);
}

.onsite-tip {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}
</style>
