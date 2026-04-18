<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MobileShell from '../components/ui/MobileShell.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
import HeartLampHoldButton from '../components/ritual/HeartLampHoldButton.vue'
import { getRandomBlessing } from '../data/blessings'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const { state, completeNode, setBlessingMessage } = useBlessingStore()

const fallbackWishType = 'babyHealth'

const wishTypeMap = {
  safeBirth: 'safeBirth',
  babyHealth: 'babyHealth',
  gratitude: 'gratitude',
  familySupport: 'familySupport',
  '求順利生產': 'safeBirth',
  '求寶寶健康平安': 'babyHealth',
  '感謝娘娘庇佑': 'gratitude',
  '陪家人一起祈福': 'familySupport',
}

onMounted(() => {
  completeNode('blessing')
})

function resolveWishType() {
  const selected = state.selectedWishType?.trim()
  return wishTypeMap[selected] || fallbackWishType
}

function collectBlessing() {
  const wishType = resolveWishType()
  const blessingText = getRandomBlessing(wishType)
  setBlessingMessage(blessingText)
  router.push('/result')
}
</script>

<template>
  <MobileShell title="收福互動" subtitle="長按心燈 2 秒，讓祝福在心中安穩亮起。">
    <JourneyProgress :current-step="4" />
    <HeartLampHoldButton @completed="collectBlessing" />
  </MobileShell>
</template>
