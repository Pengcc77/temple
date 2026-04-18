<script setup>
import { onMounted } from 'vue'
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
import { useBlessingStore } from '../stores/blessingStore'

const { state, completeNode } = useBlessingStore()

onMounted(() => {
  completeNode('offer')
})
</script>

<template>
  <MobileShell title="獻願互動" subtitle="把願望化成一句祝福，獻給註生娘娘。">
    <JourneyProgress :current-step="2" />
    <p class="page-text">
      目前祈願方向：<strong>{{ state.wishDirection || '尚未選擇' }}</strong>
    </p>
    <p class="page-text">願此心願清明穩定，並帶來平安與和諧。</p>

    <template #footer>
      <SoftButton to="/node/story">前往廟宇故事</SoftButton>
    </template>
  </MobileShell>
</template>
