<template>
  <button
    :type="type"
    class="temple-button"
    :class="[`temple-button--${variant}`]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading">{{ loadingText }}</span>
    <slot v-else />
  </button>
</template>

<script setup>
defineEmits(['click'])

defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '處理中...',
  },
})
</script>

<style scoped>
.temple-button {
  width: 100%;
  min-height: 48px;
  border-radius: var(--radius-pill);
  font-size: var(--font-md);
  font-weight: 600;
  transition: transform 0.14s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.temple-button:active {
  transform: translateY(1px);
}

.temple-button:disabled {
  opacity: 0.65;
}

.temple-button--primary {
  border: none;
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, var(--color-primary) 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
}

.temple-button--secondary {
  border: 1px solid var(--color-border-strong);
  color: #6a4f3a;
  background: rgba(255, 249, 241, 0.95);
}
</style>

