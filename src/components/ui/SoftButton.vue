<script setup>
defineProps({
  to: {
    type: [String, Object],
    default: '',
  },
  kind: {
    type: String,
    default: 'primary',
  },
  full: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <RouterLink :to="to" class="soft-button" :class="[`soft-button--${kind}`, { 'soft-button--full': full }]">
    <slot />
  </RouterLink>
</template>
