<template>
  <section class="section-card" :class="[`section-card--${tone}`]">
    <slot />
  </section>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    default: 'default',
  },
})
</script>

<style scoped>
.section-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(255, 248, 238, 0.88);
  padding: var(--space-3);
}

.section-card--default {
  box-shadow: 0 8px 16px rgba(130, 92, 62, 0.1);
}

.section-card--soft {
  background: rgba(255, 248, 238, 0.72);
}
</style>

