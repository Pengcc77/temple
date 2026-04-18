<script setup>
import { onMounted } from 'vue'
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
import { useBlessingStore } from '../stores/blessingStore'

const { completeNode } = useBlessingStore()

onMounted(() => {
  completeNode('purify')
})
</script>

<template>
  <MobileShell title="淨心互動" subtitle="深呼吸三次，讓心慢慢安靜下來。">
    <JourneyProgress :current-step="1" />
    <p class="page-text">
      吸氣時感受穩定，吐氣時放下焦躁。把想說的祈願，靜靜放在心裡。
    </p>

    <template #footer>
      <SoftButton to="/node/offer">前往獻願</SoftButton>
    </template>
  </MobileShell>
</template>
