<template>
  <PageShell
    aria-label="首頁"
    step="祥喜註生宮"
    title="向註生娘娘獻上您的祈願"
    subtitle="短暫片刻，留下誠摯祈福。"
  >
    <ProgressDots :current="0" :total="5" />

    <SectionCard tone="soft" class="u-stack-sm u-center u-fade-in">
      <div class="hero-figure-wrap" aria-hidden="true">
        <img class="hero-figure" :src="goddessFigure" alt="" />
      </div>
      <p class="temple-name">祥喜註生宮。保佑您平安</p>
      <p class="intro-text">循著簡短引導，靜心、祈願、祝福，安穩每一天。</p>
      <p class="onsite-tip">(約 3 分鐘可完成祈願)</p>
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

.hero-figure-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-figure {
  width: 138px;
  max-width: 42vw;
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
