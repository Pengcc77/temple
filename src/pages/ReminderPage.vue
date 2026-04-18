<script setup>
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import { etiquetteTips } from '../data/etiquetteTips'
</script>

<template>
  <MobileShell title="參拜提醒" subtitle="出發前，先讀一段小提醒，讓心更安定。">
    <ul class="soft-list">
      <li v-for="tip in etiquetteTips" :key="tip">{{ tip }}</li>
    </ul>

    <template #footer>
      <SoftButton to="/journey">進入祈福旅程</SoftButton>
    </template>
  </MobileShell>
</template>
