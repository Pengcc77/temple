<template>
  <main class="page-shell" :aria-label="ariaLabel || title">
    <section class="page-shell__inner">
      <header class="page-shell__header">
        <p v-if="step" class="u-step">{{ step }}</p>
        <h1 class="u-title">{{ title }}</h1>
        <p v-if="subtitle" class="u-subtitle">{{ subtitle }}</p>
        <slot name="header-extra" />
      </header>

      <section class="page-shell__content">
        <slot />
      </section>

      <footer class="page-shell__footer">
        <slot name="footer" />
      </footer>
    </section>
  </main>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  step: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.page-shell {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
}

.page-shell__inner {
  width: min(100%, var(--page-max-width));
  min-height: calc(100dvh - 40px);
  padding: var(--space-5) var(--space-4) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.page-shell__header {
  text-align: center;
}

.page-shell__header .u-step + .u-title {
  margin-top: var(--space-2);
}

.page-shell__header .u-title + .u-subtitle {
  margin-top: var(--space-2);
}

.page-shell__header :deep(.progress-dots) {
  margin-top: var(--space-3);
}

.page-shell__content {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-3);
}

.page-shell__footer {
  margin-top: auto;
  padding-top: var(--space-4);
}

@media (max-width: 360px) {
  .page-shell__inner {
    padding: var(--space-4) var(--space-3) var(--space-3);
  }

  .page-shell__header :deep(.u-title) {
    font-size: 24px;
  }
}
</style>

