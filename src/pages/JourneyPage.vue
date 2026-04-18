<script setup>
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import JourneyProgress from '../components/ritual/JourneyProgress.vue'
</script>

<template>
  <MobileShell title="祈福旅程" subtitle="接下來完成四個小站，感受祈願慢慢成形。">
    <JourneyProgress :current-step="1" />

    <div class="journey-grid">
      <RouterLink class="journey-card" to="/node/purify">淨心互動</RouterLink>
      <RouterLink class="journey-card" to="/node/offer">獻願互動</RouterLink>
      <RouterLink class="journey-card" to="/node/story">廟宇故事</RouterLink>
      <RouterLink class="journey-card" to="/node/blessing">收福互動</RouterLink>
    </div>

    <template #footer>
      <SoftButton to="/node/purify">依序開始</SoftButton>
    </template>
  </MobileShell>
</template>
