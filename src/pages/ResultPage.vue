<script setup>
import { computed } from 'vue'
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import { blessings } from '../data/blessings'
import { useBlessingStore } from '../stores/blessingStore'

const { state, resetBlessingJourney } = useBlessingStore()

const selectedBlessing = computed(() => {
  return blessings.find((item) => item.id === state.selectedBlessingId) || blessings[0]
})
</script>

<template>
  <MobileShell title="祈福完成" subtitle="願你把這份平安與祝福，帶進接下來的每一天。">
    <article class="result-card">
      <p class="result-title">{{ selectedBlessing.title }}</p>
      <p>{{ selectedBlessing.message }}</p>
    </article>

    <template #footer>
      <SoftButton to="/" @click="resetBlessingJourney">重新開始</SoftButton>
    </template>
  </MobileShell>
</template>
