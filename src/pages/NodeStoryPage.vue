<script setup>
import { computed, onMounted } from 'vue'
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
import { storyCards } from '../data/storyCards'
import { useBlessingStore } from '../stores/blessingStore'

const { completeNode } = useBlessingStore()
const currentCard = computed(() => storyCards[0])

onMounted(() => {
  completeNode('story')
})
</script>

<template>
  <MobileShell title="廟宇故事" subtitle="讀一段故事，感受信仰中的溫柔傳承。">
    <JourneyProgress :current-step="3" />

    <article class="story-card">
      <h2>{{ currentCard.title }}</h2>
      <p>{{ currentCard.content }}</p>
    </article>

    <template #footer>
      <SoftButton to="/node/blessing">前往收福</SoftButton>
    </template>
  </MobileShell>
</template>
