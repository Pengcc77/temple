<template>
  <ol class="progress-dots" aria-label="進度">
    <li v-for="idx in total" :key="idx" class="progress-dots__item">
      <span class="dot" :class="{ 'is-active': idx <= current }" aria-hidden="true"></span>
      <span v-if="showLabel" class="dot-label">{{ idx }}</span>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 5,
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.progress-dots {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.progress-dots__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.86);
}

.dot.is-active {
  background: #d7a77a;
  border-color: #c88d5b;
  box-shadow: 0 0 0 3px rgba(215, 167, 122, 0.18);
}

.dot-label {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}
</style>

