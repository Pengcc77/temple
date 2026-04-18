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
})
</script>

<template>
  <main class="mobile-shell">
    <header class="shell-header">
      <p class="shell-overline">註生娘娘數位祈福體驗</p>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="shell-subtitle">{{ subtitle }}</p>
    </header>

    <section class="shell-content">
      <slot />
    </section>

    <footer class="shell-footer">
      <slot name="footer" />
    </footer>
  </main>
</template>
