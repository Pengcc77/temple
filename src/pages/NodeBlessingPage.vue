<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MobileShell from '../components/ui/MobileShell.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
import HeartLampHoldButton from '../components/ritual/HeartLampHoldButton.vue'
import { blessings } from '../data/blessings'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const { completeNode, setSelectedBlessingId } = useBlessingStore()

onMounted(() => {
  completeNode('blessing')
})

function collectBlessing() {
  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)]
  setSelectedBlessingId(randomBlessing.id)
  router.push('/result')
}
</script>

<template>
  <MobileShell title="收福互動" subtitle="長按心燈 2 秒，讓祝福在心中安穩亮起。">
    <JourneyProgress :current-step="4" />
    <HeartLampHoldButton @completed="collectBlessing" />
  </MobileShell>
</template>
